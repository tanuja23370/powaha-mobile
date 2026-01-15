import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
  edges?: Array<"top" | "bottom" | "left" | "right">;
}

/**
 * Reusable Layout Wrapper Component
 * 
 * Features:
 * - Automatically handles insets to avoid navigation bars and notches
 * - Dynamic background color for white-labeling support
 * - Flex: 1 container that fills the screen on any device
 * 
 * @param children - React components to render inside the safe area
 * @param backgroundColor - Dynamic color for white-labeling (defaults to white)
 * @param style - Additional custom styles
 * @param edges - Specify which edges need safe area (defaults to all)
 */
export default function SafeAreaLayout({
  children,
  backgroundColor = "#FFFFFF",
  style,
  edges = ["top", "bottom", "left", "right"],
}: SafeAreaLayoutProps) {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor },
        style,
      ]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
