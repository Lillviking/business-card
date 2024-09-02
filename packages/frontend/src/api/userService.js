// src/api/userService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users/';

export async function fetchUserById(userId) {
    try {
        const response = await axios.get(`${API_URL}${userId}`);

        console.log("get user from BACKEND", JSON.stringify(response));

        if (response.data.avatar) {
            const blob = await fetch(response.data.avatar).then(r => r.blob());
            const avatarUrl = URL.createObjectURL(blob);
            response.data.avatar = avatarUrl;
        }

        console.log("after STRING: ", JSON.stringify(response));

        return response.data;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

export async function updateUserById(userId, user) {

    const formData = new FormData();

    // Lägg till alla fält utom avatar och avatarFile
    Object.entries(user).forEach(([key, value]) => {
            formData.append(key, value);
    });

    // Print the FormData contents
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ', pair[1]);
    }

    try {
        const response = await axios.patch(`${API_URL}${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user: ', error);
        throw error;
    }
}
