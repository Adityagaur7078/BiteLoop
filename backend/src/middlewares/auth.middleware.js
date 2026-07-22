const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');

// Food Partner Middleware
async function authFoodPartnerMiddleware(req, res, next) {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Please Login first"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({
                message: "Food partner not found"
            });
        }

        req.foodPartner = foodPartner;

        next();

    } catch (err) {

        console.error(err);

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

// User Middleware
async function authUserMiddleware(req, res, next) {

    try {

        const token = req.cookies.token;

        if (!token) {

            return res.status(401).json({
                message: "Please Login first"
            });

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {

            return res.status(401).json({
                message: "User not found!"
            });

        }

        req.user = user;

        next();

    } catch (err) {

        console.error(err);

        res.status(401).json({
            message: "Invalid token!"
        })

    }

}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
};