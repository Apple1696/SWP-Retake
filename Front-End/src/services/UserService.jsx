/* eslint-disable no-useless-catch */
import axios from 'axios';

const UserService = {
  login: async (email, password) => {
    try {
      const response = await axios.post('https://localhost:44362/api/Employees/login', {
        email,
        password,
      });
      if (response.data.token) {
        return response.data.token;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw error;
    }
  },
};


export default UserService;