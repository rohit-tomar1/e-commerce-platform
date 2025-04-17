import axios from "axios";
import { API_HOST, API_DEFAULT_VERSION } from "../helper/constant";

const API_URL = API_HOST + `/api/${API_DEFAULT_VERSION}/products`;

// const  getProductsByCategory = async (category) => {
//   const response = await axios.get(`${API_URL}/product/${category}`);
//   return response.data;
// };

const getProductsByCategory = async (categoryId, params = {}) => {
  // Construct query string from params object
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const url =
    `${API_URL}?categoryId=${categoryId}` +
    (queryString ? `?${queryString}` : "");
  const response = await axios.get(url);
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
