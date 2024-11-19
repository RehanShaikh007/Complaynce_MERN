import express from "express";
import Data from "../models/Data.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// **Create New Data**
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    // Creating a new data entry
    const data = new Data({
      title,
      content,
      country: req.user.country, // Associated with user's country
      createdBy: req.user.id,
    });

    await data.save();

    res.status(201).json({
      message: "Data created successfully",
      data,
    });
  } catch (err) {
    console.error("Error creating data:", err.message);
    res.status(500).json({
      message: "Error creating data",
      error: err.message,
    });
  }
});

// **Get All Data for the User's Country**
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userCountry = req.user.country;

    if (!userCountry) {
      return res.status(400).json({
        message: "User country not defined. Please update your profile.",
      });
    }

    // Fetching data for the user's country
    const data = await Data.find({ country: userCountry });

    if (data.length === 0) {
      return res.status(404).json({
        message: "No data available for this country.",
      });
    }

    res.status(200).json({
      message: "Data fetched successfully",
      data,
    });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// **Update Existing Data**
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    // Verifying if the data belongs to the user's country
    if (data.country !== req.user.country) {
      return res.status(403).json({
        message: "You can only update data for your own country.",
      });
    }

    // Updating fields
    data.title = title || data.title;
    data.content = content || data.content;

    await data.save();

    res.status(200).json({
      message: "Data updated successfully",
      data,
    });
  } catch (err) {
    console.error("Error updating data:", err.message);
    res.status(500).json({
      message: "Error updating data",
      error: err.message,
    });
  }
});

// **Delete Data**
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    // Verifying if the data belongs to the user's country
    if (data.country !== req.user.country) {
      return res.status(403).json({
        message: "You can only delete data for your own country.",
      });
    }

    await Data.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Data deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting data:", err.message);
    res.status(500).json({
      message: "Error deleting data",
      error: err.message,
    });
  }
});

export default router;
