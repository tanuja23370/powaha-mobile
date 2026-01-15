import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ⚠️ login() API assumed to exist already (no backend change)

const { width } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Authentication Error", "Please provide your credentials.");
      return;
    }

    try {
      setLoading(true);

      // ✅ SIMULATED LOGIN SUCCESS (no backend change)
      // For now, we simulate a login for userId 1 (or any existing user)
      const userId = 1;

      // Navigate to dashboard with userId
      router.replace({
        pathname: "/Dashboard",
        params: { userId: userId.toString() }
      });
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.container}>
          {/* TOP SECTION */}
          <View style={styles.topSection}>
            <Image
              source={require("../assets/images/icon.png")}
              style={styles.logo}
            />
          </View>

          {/* CURVE */}
          <View style={styles.svgContainer}>
            <Svg
              height="160"
              width={width}
              viewBox={`0 0 ${width} 160`}
              preserveAspectRatio="none"
            >
              <Path
                d={`M0,100 C${width * 0.4},180 ${width * 0.6},-20 ${width},100 L${width},160 L0,160 Z`}
                fill="#1E3A5F"
              />
            </Svg>
          </View>

          {/* FORM */}
          <View style={[styles.formSection, { paddingBottom: Math.max(insets.bottom, 40) }]}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>
                Enter your details to access your community.
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#94A3B8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Logging in..." : "LOGIN"}
              </Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don’t have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.registerLink}> Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  topSection: {
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  logo: {
    width: width * 0.65,
    height: 220,
    resizeMode: "contain",
  },
  svgContainer: {
    width,
    height: 160,
    marginTop: -110,
  },
  formSection: {
    flex: 1,
    backgroundColor: "#1E3A5F",
    paddingHorizontal: 32,
  },
  headerTextContainer: { marginBottom: 25 },
  title: { fontSize: 32, fontWeight: "800", color: "#FFF" },
  subtitle: { fontSize: 14, color: "#CBD5E1", marginTop: 4 },
  inputGroup: { marginBottom: 5 },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  forgotPassword: {
    color: "#CBD5E1",
    textAlign: "right",
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#1E3A5F",
    fontSize: 16,
    fontWeight: "800",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  registerText: { color: "#94A3B8" },
  registerLink: { color: "#FFF", fontWeight: "700" },
});
