import express  from "express";
import {config} from "dotenv";
import authRoutes from "./routes/auth.route.ts";

config();
const app = express();
const port = process.env.PORT
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use("/api/auth", authRoutes);
app.listen(port, () => {
    console.log(`Server is running ]at http://localhost:${port}`);
});