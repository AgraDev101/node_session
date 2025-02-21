import express, { application, request } from "express"
import User from "../db_schema/userSchema.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.get("/user3", async (req, res) => {
    if (req.session.user) return res.send("not logged in")
    console.log(req.sessionID)
    console.log(req.session.user)
    const getTheUserDetails = await User.findOne({ username: req.session.user })
    console.log(getTheUserDetails)
    return res.send(getTheUserDetails)
})

router.get("/user4", (req, res) => {
    if (req.session.user) return res.send("not logged in")
    console.log(req.session.cart)
    return res.send(req.session.cart)
})

router.get("/users2", (req, res) => {
    console.log(req.signedCookies)
    return res.send("signed cookie")
})

router.post("/user", async (req, res) => {
    try {
        let { username, email, password } = req.body
        const userExist = await User.findOne({email: email})
        if (userExist) {
            return res.json({message: "user already exist"})
        }
        let hashedPassword = await bcrypt.hash(password, 4)
        const user = await User.insertOne({
            username,
            email,
            password: hashedPassword
        });
        return res.json({
            message: "user successfully created"
        })  
    } catch (error) {
        console.log(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        if (req.session.user) return res.send("already logged in")
        let { username, password } = req.body
        let user = await User.findOne({ username })
        let matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.json({message: "password not correct"})
        }
        req.session.visited = true
        req.session.user = user.username
        return res.send("logged in")
    } catch (error) {
        console.log(error)
    }
})

router.get("/logout", (req, res) => {
    if (!req.session.user) {
        return res.send("not logged in")
    }
    req.session.destroy()
    return res.send("logged out")
})

router.get("/cart", (req, res) => {
    if (!req.session.user) {
        return res.send("not logged in")
    }
    console.log(req.body)
    req.session.cart = req.body
    return res.send(req.session.cart)
})

export { router }
