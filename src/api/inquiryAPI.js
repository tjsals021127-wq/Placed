import API from "./axiosInstance";
import { API_ROUTES } from "../config";

// ⭐ 문의 작성
export const createInquiry = (category, message) =>
  API.post(API_ROUTES.CREATE_INQUIRY, { category, message });

// ⭐ 내가 쓴 문의 목록
export const getMyInquiries = () =>
  API.get(API_ROUTES.MY_INQUIRIES);

// ⭐ 문의 상세 조회
export const getInquiryDetail = (id) =>
  API.get(`${API_ROUTES.INQUIRY_DETAIL}${id}/`);
