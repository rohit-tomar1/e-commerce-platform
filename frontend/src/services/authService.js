import axios from "axios";
import { API_HOST, API_DEFAULT_VERSION } from "../helper/constant";

const API_URL = API_HOST + `/api/${API_DEFAULT_VERSION}/auth`;
// const API_URL = API_HOST + `/api/auth`;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

const resetPasswordUsingToken = async (token, password) => {
  const response = await axios.post(`${API_URL}/reset-password`, {
    token,
    password,
  });
  return response.data;
};

const verifyEmail = async (token) => {
  const response = await axios.post(`${API_URL}/verify-email`, { token });
  return response.data;
};

const resendVerifyEmailLink = async (email) => {
  const response = await axios.post(`${API_URL}/resend-verification`, {
    email,
  });
  return response.data;
};

const refreshJwt = async (token) => {
  const response = await axios.post(`${API_URL}/refresh`, { token });
  return response.data;
};

export default {
  register,
  login,
  forgotPassword,
  resetPasswordUsingToken,
  verifyEmail,
  refreshJwt,
  resendVerifyEmailLink,
};
