import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlaceDetail, getReviewsByPlace, createReview } from "../api/reviewAPI";
import "../pages_CSS/PlaceDetail.css";

function PlaceDetail() {

    
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  console.log("useParams id =", id);
  // 장소 정보 + 리뷰 불러오기
  useEffect(() => {
    Promise.all([
      getPlaceDetail(id),
      getReviewsByPlace(id)
    ])
      .then(([placeRes, reviewRes]) => {
        setPlace(placeRes.data);
        setReviews(reviewRes.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // 리뷰 작성
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newReview.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    try {
      await createReview(id, newReview, rating);
      alert("리뷰가 등록되었습니다!");

      // 새 리뷰 다시 불러오기
      const updated = await getReviewsByPlace(id);
      setReviews(updated.data);

      setNewReview("");
      setRating(5);
    } catch (err) {
      console.error(err);
      alert("리뷰 작성 중 오류 발생");
    }
  };

  if (loading) return <p className="loading">불러오는 중...</p>;

  if (!place) return <p className="error">장소 정보를 불러올 수 없습니다.</p>;

  return (
    <div className="place-page">
      
      <header className="user-header">
        <div className="logo" onClick={() => navigate("/main")}>
          <img src="/placed_logo.png" alt="PLACED Logo" className="logo-img" />
          <span className="logo-text">PLACED</span>
        </div>

        <nav className="nav">
          <button onClick={() => navigate("/main")}>홈</button>
          <button onClick={() => navigate("/reviews")}>내 리뷰</button>
          <button onClick={() => navigate("/inquiries")}>문의하기</button>
        </nav>
      </header>

      
      <section className="place-info">
        <h2>{place.name}</h2>
        <img src={place.image || "https://via.placeholder.com/400"} alt={place.name} />
        <p>{place.description || "설명 준비중..."}</p>
      </section>

      
      <section className="review-section">
        <h3>리뷰</h3>

        {reviews.length === 0 ? (
          <p className="empty">아직 리뷰가 없습니다.</p>
        ) : (
          <ul className="review-list">
            {reviews.map((r) => (
              <li key={r.id} className="review-item">
                <p><strong>⭐ {r.rating}</strong></p>
                <p>{r.content}</p>
                <small>{r.created_at}</small>
              </li>
            ))}
          </ul>
        )}
      </section>

      
      <section className="write-review">
        <h3>리뷰 작성하기</h3>

        <form onSubmit={handleSubmit}>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={5}>⭐ 5</option>
            <option value={4}>⭐ 4</option>
            <option value={3}>⭐ 3</option>
            <option value={2}>⭐ 2</option>
            <option value={1}>⭐ 1</option>
          </select>

          <textarea
            placeholder="리뷰 내용을 입력하세요."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          ></textarea>

          <button type="submit">등록</button>
        </form>
      </section>

      
      <footer className="footer">
        © 2025 PLACED | <a href="#">이용약관</a> |{" "}
        <a href="#">개인정보처리방침</a>
      </footer>
    </div>
  );
}

export default PlaceDetail;
