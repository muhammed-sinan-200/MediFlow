import express from 'express'
import dotenv from 'dotenv'
import connection  from './config/db.js'
import cors from 'cors'
import cloudinaryConnect from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
import doctorRouter from './routes/doctorRoute.js'

//app configration

const app = express()
dotenv.config()
//middlewares

app.use(express.json())
app.use(cors())

connection()
cloudinaryConnect()
const port = process.env.PORT || 8000

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)  


app.get('/',(req,res)=>{
    res.send("Working aan") 
})

app.listen(port,()=>console.log(`Server running on ${port}`)
)