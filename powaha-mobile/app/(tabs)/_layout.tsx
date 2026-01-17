import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F4B41A",
        tabBarInactiveTintColor: "#6C757D",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 60,
          paddingBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="givings"
        options={{
          title: "Givings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="notifications-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 👇 HIDDEN DETAIL SCREEN (IMPORTANT) */}
      <Tabs.Screen
        name="notification-detail"
        options={{
          href: null, // removes it from bottom navigation
        }}
      />
    </Tabs>
  );
}
