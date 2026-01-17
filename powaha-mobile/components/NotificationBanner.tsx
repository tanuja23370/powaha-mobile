import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type NotificationBannerProps = {
  title: string;
  message: string;
  onClose: () => void;
  onPress?: () => void; // 👈 ADD THIS
};

export default function NotificationBanner({
  title,
  message,
  onClose,
  onPress,
}: NotificationBannerProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.banner}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        <Text style={styles.close} onPress={onClose}>
          ✕
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#e8f0ff",
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  message: {
    fontSize: 13,
    color: "#555",
  },
  close: {
    fontSize: 18,
    marginLeft: 10,
  },
});
