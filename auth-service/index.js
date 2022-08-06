const express = require("express");
const { authRouter } = require("./handler/auth");
const app = express();
require("dotenv").config();
const {PORT} = process.env;
require("./config/mongoose.config")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/auth", authRouter)
app.use((req, res, next) => {
    return res.json({error: "NotFound"})
})
app.use((error, req, res, next) => {
    return res.json({error: error.message})
})
app.listen(PORT, () => {
    console.log("Auth-Service runing over port :", PORT);
})