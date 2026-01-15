// services/api.ts

// 🔹 Base URL of backend (your laptop IP)
const API_URL = "http://10.234.194.198:5000";

/* =========================
   AUTH APIs
   ========================= */

// Login API
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

// Register API
export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

/* =========================
   NOTIFICATION APIs
   ========================= */

// Get notifications for a user
export const getUserNotifications = async (userId: number) => {
  const response = await fetch(
    `${API_URL}/api/notifications/user/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};
