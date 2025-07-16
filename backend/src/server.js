import express from 'express';
import "dotenv/config"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import cookieParser from "cookie-parser"
import { connectDb } from './lib/db.js';
import path from "path"
import cors from "cors"

const app = express()
const PORT = process.env.PORT
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
    connectDb()
})