import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchKeyword } from "../api/searchAPI";  // ⭐ API
import "../pages_CSS/SearchResults.css";

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchKeyword(keyword)     // ⭐ axios → API
      .then((res) => setResults(res.data))
      .catch((err) => console.error("검색 에러:", err))
      .finally(() => setLoading(false));
  }, [keyword]);

  return (
    <div className="search-page">
      
      {/* Header */}
      <header className="user-header">
        <div className="logo" onClick={() => navigate("/main")}>
          <img src="/placed_logo.png" alt="PLACED" className="logo-img" />
          <span className="logo-text">PLACED</span>
        </div>

        <nav className="nav">
          <button onClick={() => navigate("/main")}>홈</button>
          <button onClick={() => navigate("/favorites")}>즐겨찾기</button>
          <button onClick={() => navigate("/inquiries")}>문의내역</button>
          <button onClick={() => navigate("/contact")}>문의하기</button>
        </nav>
      </header>

      <section className="search-header">
        <h2>검색 결과</h2>
        <p className="keyword">“{keyword}” 에 대한 검색 결과입니다.</p>
      </section>

      {loading && <p className="loading">검색 중입니다...</p>}

      <section className="search-results">
        {!loading && results.length === 0 && (
          <div className="empty-box">
            <img
              className="empty-img"
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
              alt="empty"
            />
            <p>검색 결과가 없습니다.</p>
            <button onClick={() => navigate("/main")} className="back-btn">
              다른 검색어로 찾아보기
            </button>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="result-grid">
            {results.map((place) => (
              <div key={place.id} className="result-card">
                <img src={place.thumbnail} alt={place.name} />
                <h3>{place.name}</h3>
                <p>{place.address}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        © 2025 PLACED | <a href="#">이용약관</a> |{" "}
        <a href="#">개인정보처리방침</a>
      </footer>
    </div>
  );
}

export default SearchResults;
