import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.status(400).json({ status: false, message: "Not authorized, login again!" })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET_KEY)

        if (token_decode.role !== 'admin') {
            return res.status(400).json({ status: false, message: "Not authorized, login again!" })
        }

        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message
        })

    }
}

export default adminAuth;