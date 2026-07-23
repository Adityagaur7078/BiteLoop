const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");

const app = express();

app.use(express.json());
app.set("trust proxy", 1);

const allowedOrigins = new Set([
    "http://localhost:5173",
    "http://localhost:5174",
    "https://bite-loop.vercel.app",
    process.env.FRONTEND_URL,
].filter(Boolean));

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests without an Origin header (e.g., Postman)
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.has(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Origin not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

module.exports = app;