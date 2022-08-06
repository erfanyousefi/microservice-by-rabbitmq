const {default: mongoose} = require("mongoose")
const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    price: Number``,
}, {timestamps: true});
const productModel = mongoose.model("product", productSchema);
module.exports = {
    productModel
}