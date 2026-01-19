import { API_BASE_URL } from "../config/api";

const BASE_URL = API_BASE_URL;

export const getUserNotifications = async (userId: number) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/notifications/${userId}`
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("API error:", text);
      throw new Error("Failed to fetch notifications");
    }

    return await res.json();
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
};
