import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { getUserNotifications } from "../../services/api";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // TEMP (later from auth/session)
  const userId = 1;

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getUserNotifications(userId);
      setNotifications(data.notifications || []);
    } catch (error) {
      console.log("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No notifications yet</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    marginTop: 4,
    fontSize: 14,
    color: "#555",
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: "#999",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
