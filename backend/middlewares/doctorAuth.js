import jwt from 'jsonwebtoken'


const doctorAuth = async (req, res, next) => {
    try {

        const { dtoken } = req.headers
        if (!dtoken) {
            return res.json({ status: false, message: "Not authorized, login again!" })
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET_KEY)

        req.docId = token_decode.id
        next()

    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            message: error.message
        })

    }
}

export default doctorAuth;