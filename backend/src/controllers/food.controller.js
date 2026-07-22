const foodModel = require("../models/food.model");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");
const { findByIdAndUpdate } = require("../models/user.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require('uuid')

// Create Food Item
async function createFood(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "A food video is required",
            });
        }

        if (!req.body.name || !req.body.description) {
            return res.status(400).json({
                message: "Meal name and description are required",
            });
        }

        const fileUploadResult = await storageService.uploadFile(
            req.file.buffer,
            uuid() + ".mp4"
        );

        if (!fileUploadResult?.url) {
            return res.status(502).json({
                message: "Video storage did not return a usable URL",
            });
        }

        const foodItem = await foodModel.create({
            name: req.body.name,
            video: fileUploadResult.url,
            description: req.body.description,
            foodPartner: req.foodPartner._id,
        });

        return res.status(201).json({
            message: "Food Created Successfully",
            food: foodItem
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: err.message
        });

    }

}

// Get Food Item
async function getFoodItems(req, res) {

    try {

        const foodItems = await foodModel.find({}).populate("foodPartner");

        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        })

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        })

    }

}

// Like Food Item
async function likeFood(req, res) {
    
    try {
        
        const { foodId } = req.body;
        const user = req.user;

        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        });

        if (isAlreadyLiked) {

            await likeModel.deleteOne({
                user: user._id,
                food: foodId
            })

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            })

            return res.status(200).json({
                message: "Food Unliked Successfully"
            })

        }

        const like = await likeModel.create({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        })

        res.status(201).json({
            message: "Food Liked Successfully",
            like
        })

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        })

    }

}

// Save Food Item
async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({
        message: "Food ID is required",
      });
    }

    const alreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (alreadySaved) {
      await saveModel.deleteOne({
        user: user._id,
        food: foodId,
      });

      return res.status(200).json({
        message: "Food removed from saved items",
      });
    }

    const savedFood = await saveModel.create({
      user: user._id,
      food: foodId,
    });

    return res.status(201).json({
      message: "Food saved successfully",
      savedFood,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood
}