import API from "./axiosInstance";
import { API_ROUTES } from "../config";

// 장소 상세 정보
export const getPlaceDetail = (id) =>
  API.get(`${API_ROUTES.PLACE_DETAIL}${id}/`);

// 장소 리뷰 목록
export const getReviewsByPlace = (id) =>
  API.get(`${API_ROUTES.REVIEWS_BY_PLACE}${id}/`);

// 리뷰 작성
export const createReview = (placeId, content, rating) =>
  API.post(API_ROUTES.CREATE_REVIEW, {
    place_id: placeId,
    content,
    rating
  });

// 내 리뷰
export const getMyReviews = () =>
  API.get(API_ROUTES.MY_REVIEWS);
