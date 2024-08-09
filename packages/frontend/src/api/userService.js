// src/api/userService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users/';

export async function fetchUserById(userId) {
  try {
    const response = await axios.get(`${API_URL}${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

export async function updateUserById(userId, user) {
  try {
    const response = await axios.patch(`${API_URL}${userId}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user: ', error);
    throw error;
  }
}
