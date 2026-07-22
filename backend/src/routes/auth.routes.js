const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// User Authentication
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);
router.get("/profile", authMiddleware.authUserMiddleware, authController.getUserProfile);

// Food Partner Authentication
router.post('/foodPartner/register', authController.registerFoodPartner);
router.post('/foodPartner/login', authController.loginFoodPartner);
router.get('/foodPartner/logout', authController.logoutFoodPartner);
router.get('/foodPartner/me', authMiddleware.authFoodPartnerMiddleware, authController.getCurrentFoodPartner);


module.exports = router;