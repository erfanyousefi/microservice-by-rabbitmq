const { createOrderWithQueue } = require("./config/rabbitmq");
require("./config/mongoose.config")
createOrderWithQueue("ORDER")
