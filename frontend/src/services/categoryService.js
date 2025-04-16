import axios from "axios";
import { API_HOST, API_DEFAULT_VERSION } from "../helper/constant";

const API_URL = API_HOST + `/api/${API_DEFAULT_VERSION}/categories`;

const getAllCategories = async (withRelations = true) => {
  const response = await axios.get(API_URL + `?withRelations=${withRelations}`);
  return response.data;
};

export default {
  getAllCategories,
};
