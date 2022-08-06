const amqp = require("amqplib");
let channel;
const connectTochannel = async() => {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        return (await connection.createChannel());
    } catch (error) {
        console.log(("cannot connect to rabbitmq server"));
    }
}
const returnChannel = async() => {
    if(!channel) {
        channel = await connectTochannel();
    }
    return channel
}

const pushToQueue = async(queueName, data) => {
    try {
        await channel.assertQueue(queueName);
        return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
    returnChannel,
    pushToQueue,
    connectTochannel
}