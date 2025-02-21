import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import session from "express-session"
import { router as userRoutes } from "./routes/userRoutes.js"
import { router as mongoDemo } from "./routes/mongoDemo.js"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: "secret123",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
        httpOnly: true
    }
}))

app.use("/v1", userRoutes)

const connectDB = async () => {
    try {
        let password = "123%40123"
        let connect = await mongoose.connect(`mongodb+srv://username123:${password}@cluster0.zefg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("database connected")   
    } catch (error) {
        console.log(error)   
    }
}

connectDB()

const PORT = 5000

app.listen(PORT, () => console.log("server is running on port "+PORT))