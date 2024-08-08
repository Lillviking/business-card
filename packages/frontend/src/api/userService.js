import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users/';

export const fetchUserById = (userId) => {
    return axios.get(`${API_URL}${userId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching user by ID:', error);
        throw error;
      });
  };