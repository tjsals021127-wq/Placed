import API from "./axiosInstance";
import { API_ROUTES } from "../config";

// ⭐ 키워드 검색
export const searchKeyword = (keyword) =>
  API.get(`${API_ROUTES.SEARCH}?keyword=${keyword}`);
