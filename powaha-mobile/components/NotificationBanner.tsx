import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect } from "react";

export default function NotificationBanner({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // auto hide after 4 sec

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.banner}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.close}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  message: {
    color: "#d1d1d6",
    fontSize: 13,
    marginTop: 2,
  },
  close: {
    color: "#fff",
    fontSize: 16,
  },
});
