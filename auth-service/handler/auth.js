const { userModel } = require("../model/user");
const jwt = require("jsonwebtoken")
const authRouter = require("express").Router();
authRouter.post("/register", async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const existUser = await userModel.findOne({email})
        if(existUser) throw {message: "user already exist"}
        const newUser = new userModel({
            name,
            email,
            password
        })
        await newUser.save();
        return res.json({
            message: "new user created"
        })
    } catch (error) {
        next(error)
    }
})
authRouter.post("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const existUser = await userModel.findOne({email}, {__v: 0})
        if(!existUser) throw {message: "user not found"}
        if(existUser.password !== password) throw {message: "password incorrect"}
        delete existUser.password
        jwt.sign({email, id : existUser._id, name: existUser.name}, "secretKey", (err, token) => {
            if(!err) return res.json({token})
            return res.json({error: err.message})
        })
    } catch (error) {
        next(error)
    }
})
module.exports = {
    authRouter
}