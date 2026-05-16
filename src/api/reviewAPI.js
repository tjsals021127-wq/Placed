import API from "./axiosInstance";
import { API_ROUTES } from "../config";

export const getPlaceDetail = (id) =>
  API.get(`${API_ROUTES.PLACE_DETAIL}${id}/`);

export const getReviewsByPlace = (id) =>
  API.get(`${API_ROUTES.REVIEWS_BY_PLACE}${id}/`);

export const createReview = (placeId, content, rating) =>
  API.post(API_ROUTES.CREATE_REVIEW, { place_id: placeId, content, rating });

export const getMyReviews = () =>
  API.get(API_ROUTES.MY_REVIEWS);

// 백엔드 연결 시 사용
export const updateReview = (id, content, rating) =>
  API.patch(`/api/reviews/${id}/`, { content, rating });

export const deleteReview = (id) =>
  API.delete(`/api/reviews/${id}/`);