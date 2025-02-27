    import express from "express";
    import dotenv from 'dotenv'
    import cookieParser from "cookie-parser"
    import router from "./router/auth"
    import { MongoConnect } from "./connection";
    const app = express();
    const port = 8000;

    dotenv.config();

    // Database Connection
    MongoConnect(process.env.MONGO_URL  as string);


    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    app.use(cookieParser())
    app.use('/api/', router);

    app.listen(port, () => {
        console.log(`Server started at ${port}`);
    });
