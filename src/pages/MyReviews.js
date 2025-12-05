import React, { useEffect, useState } from "react";
import { getMyReviews } from "../api/reviewAPI";
import { useNavigate } from "react-router-dom";
import "../pages_CSS/MyReviews.css";

function MyReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 내가 쓴 리뷰 가져오기
  useEffect(() => {
    getMyReviews()
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">불러오는 중...</p>;

  return (
    <div className="review-page">

      
      <header className="user-header">
        <div className="logo" onClick={() => navigate("/main")}>
          <img src="/placed_logo.png" alt="PLACED Logo" className="logo-img" />
          <span className="logo-text">PLACED</span>
        </div>

        <nav className="nav">
          <button onClick={() => navigate("/main")}>홈</button>
          <button onClick={() => navigate("/inquiries")}>문의하기</button>
        </nav>
      </header>

      
      <section className="review-section">
        <h2>내 리뷰</h2>

        {reviews.length === 0 ? (
          <p className="empty">아직 작성한 리뷰가 없습니다.</p>
        ) : (
          <ul className="review-list">
            {reviews.map((r) => (
              <li key={r.id} className="review-item">
                <h4>{r.place_name || "장소 이름 없음"}</h4>
                <p className="rating">⭐ {r.rating}</p>
                <p>{r.content}</p>
                <small>{r.created_at}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="footer">
        © 2025 PLACED | <a href="#">이용약관</a> |{" "}
        <a href="#">개인정보처리방침</a>
      </footer>
    </div>
  );
}

export default MyReviews;
