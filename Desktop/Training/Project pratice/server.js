import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import route from "./Routes/UserRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT;
const Mongo_url = process.env.MONGO_URL;

mongoose.connect(Mongo_url).then(() => {
    console.log("Database Connection Successful");
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch((error) => console.log(error));

app.use('/api/students', route);

export default app;
