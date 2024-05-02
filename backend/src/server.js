const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const cron = require("node-cron")
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const connectDB = require('./config/db')

const app = express();
connectDB()

dotenv.config();
app.use(express.json());
app.use(cors());
app.options("*", cors());

const port = Number(process.env.PORT || 8111);

app.use(`/`, require('./routes/suiheroes.route'));

// 404 error
app.all('*', (req, res, next) => {const err = new HttpException(404, 'Endpoint Not Found'); next(err);});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;