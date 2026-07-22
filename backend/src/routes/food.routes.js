const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controller");
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});

// POST /api/food/ [protected]
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);

// GET /api/food/ [protected]
router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems);

// POST /api/food/like [protected]
router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFood);

// POST /api/food/save [protected]
router.post("/save", authMiddleware.authUserMiddleware, foodController.saveFood);


module.exports = router;