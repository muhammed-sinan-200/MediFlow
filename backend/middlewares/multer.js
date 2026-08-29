import multer from 'multer'
import crypto from 'crypto'

const ALLOWED_MIME_TYPES = new Set([
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
])

const MIME_EXT = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
}

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const ext = MIME_EXT[file.mimetype] || ''
        cb(null, `${crypto.randomUUID()}${ext}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only JPEG, PNG, and WebP images are allowed'))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
})

const getMulterErrorMessage = (err) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return 'Image must be 5 MB or smaller'
    }
    if (err.message === 'Only JPEG, PNG, and WebP images are allowed') {
        return err.message
    }
    if (err.name === 'MulterError') {
        return 'Invalid file upload'
    }
    return 'Invalid file upload'
}

const uploadImage = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: getMulterErrorMessage(err),
            })
        }
        next()
    })
}

export default upload
export { uploadImage }
