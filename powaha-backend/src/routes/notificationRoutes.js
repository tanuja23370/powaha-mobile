import express from "express";
import {
  createNotification,
  getUserNotifications,
} from "../controllers/notificationController.js";


const router = express.Router();

// CREATE notification
router.post("/", createNotification);

// GET notifications for a user
router.get("/user/:userId", getUserNotifications);

export default router;
