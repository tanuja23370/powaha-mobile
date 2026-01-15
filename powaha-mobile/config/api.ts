/**
 * API Configuration for POWAHA Mobile App
 */

import { Platform } from 'react-native';

/**
 * Get the API base URL based on platform
 * - Web: localhost
 * - iOS Simulator: localhost
 * - Android Emulator: 10.0.2.2 (special IP for host machine)
 * - Physical Device: Computer's IP address
 */
const getApiUrl = (): string => {
  // For web platform
  if (Platform.OS === 'web') {
    return 'http://localhost:5000';
  }
  
  // For Android emulator
  if (Platform.OS === 'android') {
    // If testing on emulator, use 10.0.2.2
    // If testing on physical device, use computer's IP
    // Change this based on your testing environment
    return 'http://10.234.194.198:5000'; // Physical device / Computer IP
    // return 'http://10.0.2.2:5000';  // Uncomment for Android Emulator
  }
  
  // For iOS simulator or physical iOS device on same WiFi
  return 'http://10.234.194.198:5000';
};

export const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
  },

  
};
