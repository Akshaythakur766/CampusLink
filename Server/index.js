const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 8000;
const cookieParser = require('cookie-parser');
const router = require("./router/auth");

dotenv.config();

// Database Connection
const { MongoConnect } = require('./connection');
MongoConnect(process.env.MONGO_URL);


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/', router);

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
