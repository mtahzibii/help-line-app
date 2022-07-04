const axios = require('axios');
const API_URL = 'http://localhost:5000/api/users';

// Register user
const register = async (userData) => {
 const response = await axios.post(API_URL, userData);
 console.log('sent?');

 console.log(response.data);
 if (response.data) {
  localStorage.setItem('user', JSON.stringify(response.data));
 }

 return response.data;
};

const authService = { register };

export default authService;
