import axios from "axios";
import { API_HOST, API_DEFAULT_VERSION } from "../helper/constant";

const API_URL = API_HOST + `/api/${API_DEFAULT_VERSION}/auth`;

const getProductsByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/category/${category}`);
  return response.data;
};

const getProductDetails = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

export default {
  getProductsByCategory,
  getProductDetails,
};
