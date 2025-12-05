import API from "./axiosInstance";
import { API_ROUTES } from "../config";

// ⭐ 로그인 (ID 기반)
export const loginUser = (id, password) =>
  API.post(API_ROUTES.LOGIN, { id, password });

// ⭐ 회원가입 (ID 기반)
export const signupUser = (id, password) =>
  API.post(API_ROUTES.SIGNUP, { id, password });

// ⭐ 아이디 중복확인
export const checkDuplicateId = (id) =>
  API.get(`${API_ROUTES.CHECK_ID}?id=${id}`);
