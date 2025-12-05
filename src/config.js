// 서버 주소 (Django 서버 켜지면 여기만 변경하면 됨)
export const BASE_URL = "http://localhost:8000";

// 모든 API 엔드포인트
export const API_ROUTES = {
  // 사용자 관련
  LOGIN: "/api/users/login/",
  SIGNUP: "/api/users/signup/",
  CHECK_ID: "/api/users/check-id/",

  // 문의 관련
  CREATE_INQUIRY: "/api/inquiries/create/",
  MY_INQUIRIES: "/api/inquiries/mine/",
  INQUIRY_DETAIL: "/api/inquiries/",    // + id + "/" 로 상세 조회

  // 검색 관련
  SEARCH: "/api/search",
};
