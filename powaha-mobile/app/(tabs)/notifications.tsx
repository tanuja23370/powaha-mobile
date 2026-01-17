import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getUserNotifications } from "../../services/api";

type Notification = {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  imageurl?: string | null;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = 1;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getUserNotifications(userId);

      const sorted = response.notifications.sort(
        (a: Notification, b: Notification) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setNotifications(sorted);
    } catch (error) {
      console.log("Failed to load notifications", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E3A5F" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/notification-detail",
                params: {
                  title: item.title,
                  message: item.message,
                  createdAt: item.createdAt,
                  imageKey: item.imageurl, // backend value
                },
              })
            }
          >
            <View
              style={[
                styles.card,
                !item.isRead && styles.unreadCard,
              ]}
            >
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>

              <Text style={styles.message} numberOfLines={2}>
                {item.message}
              </Text>

              <Text style={styles.time}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0B1B3A",
    marginVertical: 16,
  },
  card: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    height: 100,
    justifyContent: "space-between",
    elevation: 3,
  },
  unreadCard: {
    backgroundColor: "#f1da9c",
    borderLeftWidth: 4,
    borderLeftColor: "#244570",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0B1B3A",
  },
  message: {
    fontSize: 14,
    color: "#444",
  },
  time: {
    fontSize: 12,
    color: "#6C757D",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
