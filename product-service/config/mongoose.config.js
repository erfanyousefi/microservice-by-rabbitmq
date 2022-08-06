const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/product-service", (error) => {
    if(!error) return console.log("connected to product-service DB!");
    console.log("Error: can not connect to product-service");
})