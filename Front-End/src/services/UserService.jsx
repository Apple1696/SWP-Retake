import axios from 'axios';

const UserService = {
  login: async (username, password) => {
    try {
      const response = await axios.post('https://your-api-url.com/api/login', {
        username,
        password,
      });
      if (response.data.success) {
        return true;
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      throw error;
    }
  },
};


  export default UserService;