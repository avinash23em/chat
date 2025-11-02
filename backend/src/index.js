import dotenv from "dotenv"

// Load environment variables FIRST before any other imports
dotenv.config();

import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import passport from "./lib/passport.js"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import {connectDB} from "./lib/db.js"
import { app, server } from "./lib/socket.js"
const PORT=process.env.PORT;

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

// Increase payload size limit for image uploads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

server.listen(PORT,()=>{
    console.log("server is listening on port:"+PORT);
    connectDB();
})