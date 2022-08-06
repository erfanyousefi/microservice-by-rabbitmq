const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/auth-service", (error) => {
    if(!error) return console.log("connected to auth-service DB!");
    console.log("Error: can not connect to auth-service");
})