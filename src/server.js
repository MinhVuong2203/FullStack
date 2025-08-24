import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoute from './route/web';
import connectDB from './config/connectDB';
require('dotenv').config(); // load environment variables from .env file

let app = express();
// config app
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

viewEngine(app);
initWebRoute(app);

connectDB();

let port = process.env.POST || 6969; // lấy PORT từ file .env
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
