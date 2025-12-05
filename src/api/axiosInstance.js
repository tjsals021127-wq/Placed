import axios from "axios";
import { BASE_URL } from "../config";

// ⭐ 공통 axios 인스턴스
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ⭐ 요청마다 자동 Authorization 헤더 추가 (토큰 있을 경우)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
