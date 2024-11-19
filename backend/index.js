import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();
connectDB();


app.use(cors({ origin: "http://localhost:5173", methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'], }));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
});