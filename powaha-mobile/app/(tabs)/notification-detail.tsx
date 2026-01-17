import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { notificationImages } from "../../constants/notificationImages";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

export default function NotificationDetailScreen() {
  const {
    title,
    message,
    createdAt,
    imageKey,
    imageUrl, // 🔥 NEW (dynamic image from admin)
  } = useLocalSearchParams();

  const [copied, setCopied] = useState(false);

  // 🔹 Normalize image key (for local fallback)
  const normalizedKey =
    typeof imageKey === "string"
      ? imageKey
          .toLowerCase()
          .replace(".png", "")
          .replace(/\s/g, "")
      : "fallback";

  const fallbackImage =
    notificationImages[normalizedKey] ??
    notificationImages.fallback;

  // 🔹 Copy full message
  const handleCopy = async () => {
    await Clipboard.setStringAsync(String(message));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Top Bar */}
      <View style={styles.topBar}>
        {/* BACK → Notifications list */}
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/notifications")}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* COPY ICON */}
        <TouchableOpacity onPress={handleCopy}>
          {copied ? (
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color="#28A745"
            />
          ) : (
            <Ionicons
              name="copy-outline"
              size={22}
              color="#1E3A5F"
            />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 🔥 DYNAMIC IMAGE (REMOTE → LOCAL FALLBACK) */}
        <Image
          source={
            typeof imageUrl === "string" && imageUrl.length > 0
              ? { uri: imageUrl }
              : fallbackImage
          }
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.time}>
          {new Date(String(createdAt)).toLocaleString()}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.message}>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E3A5F",
  },
  scroll: {
    paddingBottom: 24,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B1B3A",
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: "#6C757D",
  },
  divider: {
    height: 1,
    backgroundColor: "#E1E4E8",
    marginVertical: 16,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
});
