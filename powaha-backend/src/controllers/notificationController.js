import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * CREATE NOTIFICATION
 * Admin / Church sends notification to a user
 */
export const createNotification = async (req, res) => {
  try {
    const { title, message, userId } = req.body;

    // basic validation
    if (!title || !message || !userId) {
      return res.status(400).json({
        success: false,
        message: "title, message and userId are required",
      });
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        userId: Number(userId),
      },
    });

    return res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Create Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create notification",
    });
  }
};

/**
 * GET ALL NOTIFICATIONS FOR A USER
 */
export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await prisma.notification.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};
