const {
    Channel
} = require("grpc");
const {
    isAuthenticated
} = require("../../isAuthenticated");
const {
    pushToQueue,
    returnChannel,
    createQueue
} = require("../config/rabbitmq");
const {
    productModel
} = require("../model/product");

const productRouter = require("express").Router();
productRouter.post("/create", async (req, res, next) => {
    try {
        const {
            name,
            desc,
            price
        } = req.body;
        const newProduct = new productModel({
            name,
            desc,
            price
        });
        await newProduct.save();
        return res.json({
            message: "a new product created",
            product: newProduct
        })
    } catch (error) {
        next(error)
    }
})
productRouter.post("/buy", isAuthenticated, async (req, res, next) => {
    try {
        const {
            productIDs = []
        } = req.body;
        const products = await productModel.find({
            _id: {
                $in: productIDs
            }
        })
        const {
            email
        } = req.user;
        await pushToQueue("ORDER", {
            products,
            userEmail: email
        });
        const {
            channel,
            queueDetail
        } = await createQueue("PRODUCT");
        let index = 0;
        channel.consume("PRODUCT", msg => {
            console.log(index, queueDetail.messageCount);
            channel.ack(msg)
        })
        return res.json({
            message: "your order created",
        })
    } catch (error) {
        next(error)
    }
})
module.exports = {
    productRouter
}