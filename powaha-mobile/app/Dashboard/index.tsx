import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import NotificationBanner from "../../components/NotificationBanner";
import { getUserNotifications } from "../../services/api";

export default function Dashboard() {
  const { userId } = useLocalSearchParams();
  const [notification, setNotification] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    if (userId) {
      fetchLatestNotification(Number(userId));
    }
  }, [userId]);

  const fetchLatestNotification = async (id: number) => {
    try {
      const data = await getUserNotifications(id);
      if (data && data.notifications && data.notifications.length > 0) {
        // Show the latest notification (first in the list)
        setNotification(data.notifications[0]);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔔 In-App Notification Banner */}
      {notification && (
        <NotificationBanner
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <Text style={styles.heading}>Dashboard</Text>
      <Text style={styles.text}>Welcome to your dashboard 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 30,
  },
});
