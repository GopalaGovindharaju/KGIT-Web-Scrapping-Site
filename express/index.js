import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import express from 'express';
import ambitionRouter from "./ambitionbox.js";
import googleRouter from "./googlemapreview.js";

const app = express();

app.use("/ambition",ambitionRouter)
app.use("/google",googleRouter)

// Start the server on a specific port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});