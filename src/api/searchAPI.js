import API from "./axiosInstance";
import { API_ROUTES } from "../config";

export const searchKeyword = (keyword) =>
  API.get(`${API_ROUTES.SEARCH}?keyword=${keyword}`);
