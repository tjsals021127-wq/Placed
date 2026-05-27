import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages_CSS/SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword") || "";
  
  const [results, setResults] = useState([
    { 
      id: 1, 
      name: "장소 A", 
      address: "서울 강남구 역삼동", 
      reliability: 92, 
      img: "https://t4.ftcdn.net/jpg/16/79/44/21/240_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg" 
    },
    { 
      id: 2, 
      name: "장소 B", 
      address: "서울 마포구 연남동", 
      reliability: 88, 
      img: "https://t4.ftcdn.net/jpg/16/79/44/21/240_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg" 
    }
  ]);

  return (
    <div className="search-results-page">
      <Header />

      <main className="results-container">
        <div className="search-title-section">
          <h2>검색 결과</h2>
          <p className="keyword-info">"{keyword}"에 대한 검색 결과입니다.</p>
        </div>

        {results.length > 0 ? (
          <div className="results-list-wrapper">
            <p className="ai-notice-text">"{keyword}"에 대한 <strong>AI 분석 완료</strong> 리스트입니다.</p>
            <div className="results-grid">
              {results.map((item) => (
                <div key={item.id} className="result-card" onClick={() => navigate(`/place/${item.id}`)}>
                  <div className="card-img-box">
                    <img src={item.img} alt={item.name} className="result-img" />
                  </div>
                  <div className="card-info-box">
                    <div className="card-title-line">
                      <h3>{item.name}</h3>
                      <span className="ai-status-badge">AI 분석 완료</span>
                    </div>
                    <p className="card-address">주소 : {item.address}</p>
                    <p className="card-trust-value">신뢰도 {item.reliability}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-result-wrapper">
            <div className="empty-box">
              <img src="/no_result_icon.png" alt="No Result" className="error-icon" />
              <p>검색 결과가 없습니다.</p>
              <button className="back-btn" onClick={() => navigate("/main")}>
                다른 검색어로 찾아보기
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default SearchResults;