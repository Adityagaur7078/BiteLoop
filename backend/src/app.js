const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');


const app = express();

app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        const isLocalFrontend = !origin || /^https?:\/\/(localhost|127\.0\.0\.1):(5173|5174)$/.test(origin);

        if (isLocalFrontend) {
            return callback(null, true);
        }

        return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true
}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;