import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

const registerUser = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing fields!" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email!" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Enter a strong password!" })
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salRounds = 10;
        const salt = bcrypt.genSaltSync(salRounds);
        const hashed = await bcrypt.hash(password, salt);

        const userData = { name, email, password: hashed };
        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({ success: true, token, data: user })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false, message: "Invalid email"
            })
        }
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if (isPassword) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
            return res.status(200).json({
                success: true, token
            })
        } else {
            return res.status(400).json({
                success: false, message: "Invalid Credentials"
            });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser }


