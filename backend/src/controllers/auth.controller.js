const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
async function registerUser(req, res) {

    try {

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All Fields Are Required",
            });
        }

        const isUserAlreadyRegistered = await userModel.findOne({ email });

        if (isUserAlreadyRegistered) {
            return res.status(409).json({
                message: "User Already Registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            message: "User Created Successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

}

// Login User
async function loginUser(req, res) {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All Fields Are Required",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email Or Password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Email Or Password",
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "User Logged In Successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

}

// Logout User
async function logoutUser(req, res) {

    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return res.status(200).json({
            message: "User Logged Out Successfully",
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

}

// Register Food Partner
async function registerFoodPartner(req, res) {

    try {

        const { name, contactName, address, phone, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All Fields Are Required",
            });
        }

        const isFoodPartnerAlreadyRegistered = await foodPartnerModel.findOne({ email });

        if (isFoodPartnerAlreadyRegistered) {
            return res.status(409).json({
                message: "Food Partner Already Registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const foodPartner = await foodPartnerModel.create({
            name,
            contactName,
            address,
            phone,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: foodPartner._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            message: "Food Partner Created Successfully",
            foodPartner: {
                _id: foodPartner._id,
                name: foodPartner.name,
                contactName: foodPartner.contactName,
                address: foodPartner.address,
                phone: foodPartner.phone,
                email: foodPartner.email,
            },
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

}

// Login Food Partner
async function loginFoodPartner(req, res) {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All Fields Are Required",
            });
        }

        const foodPartner = await foodPartnerModel.findOne({ email });

        if (!foodPartner) {
            return res.status(400).json({
                message: "Invalid Email Or Password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            foodPartner.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Email Or Password",
            });
        }

        const token = jwt.sign(
            { id: foodPartner._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Food Partner Logged In Successfully",
            foodPartner: {
                _id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
            },
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

}

// Logout Food Partner
async function logoutFoodPartner(req, res) {

    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return res.status(200).json({
            message: "Food Partner Logged Out Successfully",
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

}

// Get the currently authenticated food partner
async function getCurrentFoodPartner(req, res) {
    return res.status(200).json({
        foodPartner: {
            _id: req.foodPartner._id,
            name: req.foodPartner.name,
            contactName: req.foodPartner.contactName,
            address: req.foodPartner.address,
            phone: req.foodPartner.phone,
            email: req.foodPartner.email,
        },
    });
}

// Get the currently authenticated user
async function getUserProfile(req, res) {

    try {
        
        return res.status(200).json({
            message: "Profile fetched successfully",
            user: req.user
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Internal Server Error"
        })

    }

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getCurrentFoodPartner,
    getUserProfile
};