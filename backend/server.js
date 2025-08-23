import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App config
const app = express();

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-seven-tau-41.vercel.app",
  "https://book-my-doc-seven.vercel.app"
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// JSON parser
app.use(express.json());

// API routes
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

export default app;
