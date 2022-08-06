const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/order-service", (error) => {
    if(!error) return console.log("connected to order-service DB!");
    console.log("Error: can not connect to order-service");
})