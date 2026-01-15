/**
 * Authentication Service
 * Handles API calls to the backend
 */

import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  userId?: string;
}

/**
 * Register a new user
 */
export const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  try {
    const apiUrl = `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`;
    console.log('=== REGISTRATION ATTEMPT ===');
    console.log('API URL:', apiUrl);
    console.log('User Data:', JSON.stringify(userData, null, 2));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    console.log('Response received!');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.json();
    console.log('Response Data:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error: any) {
    console.error('=== REGISTRATION ERROR ===');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Full Error:', error);
    
    if (error.message.includes('Network request failed') || error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to backend. Make sure server is running on port 5000.');
    }
    
    throw error;
  }
};
