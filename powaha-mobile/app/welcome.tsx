import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

/**
 * Welcome Screen for POWAHA
 * Features an organic Bezier curve transition between the white logo section 
 * and the navy blue content section.
 * * DESIGN UPDATE: 
 * 1. Adjusted curve to start lower on the left for a "cross" swoop.
 * 2. Perfect merge with bottom section by using overlapping margins.
 */
export default function App() {
  const router = useRouter();

  // Reference for the local asset - path must be correct in local environment
  const logoSource = require("../assets/images/icon.png");

  return (
    <View style={styles.container}>
      {/* TOP SECTION: Branding area */}
      <View style={styles.topSection}>
        <Image
          source={logoSource}
          style={styles.logo}
        />
      </View>

      {/* CURVE SECTION: SVG transition designed to "stitch" the two halves together */}
      <View style={styles.svgContainer}>
        <Svg
          height="160"
          width={width}
          viewBox={`0 0 ${width} 160`}
          style={styles.svg}
          preserveAspectRatio="none"
        >
          <Path
            // d attribute logic:
            // M0,80: Starts 80px down on left (Lowered as requested)
            // C: Cubic Bezier curve creates the "cross" swoop
            // Control point 1: width * 0.4, 180 (Deep dip)
            // Control point 2: width * 0.6, -20 (High peak)
            // End point: width, 80 (Exit right)
            d={`M0,80 C${width * 0.4},180 ${width * 0.6},-30 ${width},60 L${width},160 L0,160 Z`}
            fill="#1E3A5F"
          />
        </Svg>
      </View>

      {/* BOTTOM SECTION: Content area with brand navy blue background */}
      <View style={styles.bottomSection}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text style={styles.welcomeSubtitle}>
              Welcome to a place of prayer, peace, and community.
            </Text>
          </View>

          {/* Action Footer */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => router.replace("/login")}
            activeOpacity={0.8}
          >
            <Text style={styles.continueText}>Continue</Text>
            <View style={styles.arrowCircle}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topSection: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
  },
  logo: {
    width: width * 0.72,
    height: width * 0.72,
    resizeMode: "contain",
  },
  svgContainer: {
    width: width,
    height: 160,
    backgroundColor: "transparent",
    // Overlap the white section slightly more to hide the logo bottom if needed
    marginTop: -120, 
    zIndex: 2,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#1E3A5F",
    // Merge with SVG fill by a 2px overlap to avoid pixel-gaps
    marginTop: -2, 
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  textContainer: {
    marginTop: 10,
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "#FFFFFF",
    lineHeight: 26,
    opacity: 0.85,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  continueText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: 15,
  },
  arrowCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "400",
  },
});