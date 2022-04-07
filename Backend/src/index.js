import express from 'express'
import mongoose from 'mongoose'
import { Routes } from "./routes/index.js"
import ApiError from "./utils/api-error.js"
import { BodyParser } from './middlewares/body-parser.js'
import http from 'http';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express();

app.use(cors());
app.use(BodyParser);
app.use(Routes);
app.use((err, req, res, next) => {
    if (err.constructor === ApiError && err.name === 'ApiError') {
        res.status(err.responseCode).send(err.toResponseData())
    } else {
        res.sendStatus(500)
        console.log(err)
    }
})

const server = http.createServer(app);

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Connection is established and running on port: ${PORT}`)))
.catch((err) => console.log(err.message));