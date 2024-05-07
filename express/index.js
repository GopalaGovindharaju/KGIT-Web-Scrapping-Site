import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import express from 'express';
import ambitionRouter from "./ambitionbox.js";
import googleRouter from "./googlemapreview.js";
import userRouter from "./user/authentication.js"
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors())
mongoose.connect('mongodb://localhost:27017/WebScrapping')
.then(() => {
    console.log("database conneted");
})
.catch(() => {
    console.log("error with DB connection!");
})

app.use("/ambition",ambitionRouter)
app.use("/google",googleRouter)
app.use("/api",userRouter)

// Start the server on a specific port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});