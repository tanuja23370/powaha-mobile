import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { registerUser } from "../services/authService";

const { width } = Dimensions.get("window");

/**
 * Standardized Register Screen for POWAHA
 * Synchronized with the established design language:
 * Path: M0,100 C(width*0.4),180 (width*0.6),-30 (width),40 ...
 */
export default function App() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- State & Logic ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors: any = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Email validation - proper format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone validation - exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    // Password validation - min 6 characters and at least 1 special character
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!specialCharRegex.test(password)) {
      newErrors.password = "Password must contain at least 1 special character";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: password,
      });

      console.log('Registration successful!', response);

      // Navigate to login immediately after successful registration
      router.replace("/login");

    } catch (error: any) {
      setLoading(false);
      console.error('Registration failed:', error);
      Alert.alert(
        "Registration Failed",
        error.message || "Something went wrong. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#1E3A5F" }}
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >

      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.container}>
          {/* TOP SECTION: Branding Area */}
          <View style={styles.topSection}>
            <Image
              // Standard require for local assets in local dev environments
              source={require("../assets/images/icon.png")}
              style={styles.logo}
            />
          </View>

          {/* CURVE SECTION: Refined cross-swoop transition */}
          <View style={styles.svgContainer}>
            <Svg
              height="160"
              width={width}
              viewBox={`0 0 ${width} 160`}
              style={styles.svg}
              preserveAspectRatio="none"
            >
              <Path
                // UPDATED COORDINATES:
                // Start: M0,100 (Lowered left side)
                // Curve: C(width * 0.4),180 (width * 0.6),-30
                // End: (width),40 (Raised right side)
                d={`M0,100 C${width * 0.4},180 ${width * 0.6},-20 ${width},100 L${width},160 L0,160 Z`}
                fill="#1E3A5F"
              />
            </Svg>
          </View>

          {/* FORM SECTION: Professional navy theme */}
          <View style={[styles.formSection, {}]}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.subtitle}>Join our community of prayer and peace.</Text>
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Full Name"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                autoCapitalize="words"
                selectionColor="#1E3A5F"
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email Address"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                selectionColor="#1E3A5F"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                placeholder="Phone Number"
                placeholderTextColor="#94A3B8"
                value={phone}
                onChangeText={(text) => {
                  // Only allow digits and max 10 characters
                  const numericValue = text.replace(/[^0-9]/g, '');
                  if (numericValue.length <= 10) {
                    setPhone(numericValue);
                    if (errors.phone) setErrors({ ...errors, phone: null });
                  }
                }}
                keyboardType="phone-pad"
                maxLength={10}
                selectionColor="#1E3A5F"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Password "
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                secureTextEntry
                selectionColor="#1E3A5F"
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                placeholder="Confirm Password"
                placeholderTextColor="#94A3B8"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                }}
                secureTextEntry
                selectionColor="#1E3A5F"
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            <TouchableOpacity
              style={[styles.createButton, loading && styles.createButtonDisabled]}
              onPress={handleRegister}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#1E3A5F" size="small" />
              ) : (
                <Text style={styles.createButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* LOGIN REDIRECT */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.replace("/login")}>
                <Text style={styles.loginLink}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  topSection: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 30,
  },

  logo: {
    width: width * 0.66,
    height: 180,
    resizeMode: "contain",
  },
  svgContainer: {
    width: width,
    height: 160,
    backgroundColor: "transparent",
    marginTop: -120, // Synchronized overlap
    zIndex: 2,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  formSection: {
    flex: 1,
    backgroundColor: "#1E3A5F",
    paddingHorizontal: 32,
    marginTop: -2, // Seamless merge with SVG
    zIndex: 1,
  },
  headerTextContainer: {
    marginBottom: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#CBD5E1",
    marginTop: 4,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0F172A",
    marginBottom: 13,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  errorText: {
    color: "#FCA5A5",
    fontSize: 12,
    marginBottom: 0,
    marginTop: -8,
    marginLeft: 4,
    fontWeight: "500",
  },
  createButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: "#1E3A5F",
    fontSize: 16,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    paddingBottom: 20,
  },
  loginText: {
    color: "#94A3B8",
    fontSize: 14,
  },
  loginLink: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});