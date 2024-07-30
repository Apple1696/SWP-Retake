import axios from 'axios';

const API_BASE_URL = 'https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api';

const OrderService = {
  getOrderDetails: (orderNumber) => {
    return axios.get(`${API_BASE_URL}/Orders?orderNumber=${orderNumber}`);
  },

};

export default OrderService;
