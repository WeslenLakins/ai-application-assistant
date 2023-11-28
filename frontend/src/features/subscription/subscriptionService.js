import axios from "axios";

const API_URL = "/api/subscription/";

// Get subscription product
const getSubscriptionProduct = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "product", config);

  return response.data;
};

const createCheckoutSession = async (data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, data, config);

  return response.data;
};

const getSubscription = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const cancelSubscription = async (data,token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "cancel",data, config);

  return response.data;
};

const subscriptionService = {
  getSubscriptionProduct,
  createCheckoutSession,
  getSubscription,
  cancelSubscription,
};

export default subscriptionService;
