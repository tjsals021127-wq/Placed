import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header"; 
import "../pages_CSS/PlaceDetail.css";

function PlaceDetail() {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 임시 더미데이터, 백엔드 붙이면 API 호출로 교체
    setTimeout(() => {
      setPlaceData({
        name: "가게 A",
        address: "주소 : 서울 강남구 역삼동",
        description: "상세 설명 영역입니다.",
        reliability: 85,
        reviewCount: 152,
        analysis: [
          { id: 1, text: "실제 방문자들의 긍정적인 반응이 많습니다.", type: "check" },
          { id: 2, text: "광고성 키워드 비중이 낮아 신뢰할 수 있습니다.", type: "check" },
          { id: 3, text: "최근 리뷰 중 일부 서비스 불만이 감지되었습니다.", type: "warning" },
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDirections = () => {
    if (!placeData) return;
    const destName = encodeURIComponent(placeData.name);
    const url = `https://map.naver.com/v5/directions/내위치/-/${destName}/-/walk?squery=내위치`;
    window.open(url, "_blank");
  };

  if (loading) return <div className="loading-box">데이터 분석 중...</div>;

  return (
    <div className="place-detail-page">
      <Header />
      <main className="detail-container">
        {/* 왼쪽 섹션: 장소 정보 */}
        <section className="info-card">
          <div className="image-placeholder">
            <span className="img-icon">🖼️</span>
          </div>
          <div className="text-info">
            <div className="title-row">
              <h2>{placeData.name}</h2>
              <button className="dir-btn" onClick={handleDirections}>
                📍 길찾기
              </button>
            </div>
            <p className="addr">{placeData.address}</p>
            <p className="desc">{placeData.description}</p>
          </div>
        </section>

        {/* 오른쪽 섹션: AI 분석 리포트 */}
        <section className="report-card">
          <div className="report-header">
            <h3>🤖 AI 광고 분석 리포트</h3>
          </div>
          <div className="score-box">
            <span className="score">{placeData.reliability}%</span>
            <p className="score-label">실사용자 리뷰 신뢰도</p>
            <p className="score-sub">리뷰 {placeData.reviewCount}개를 분석한 결과입니다.</p>
          </div>
          <div className="analysis-list">
            {placeData.analysis.map((item) => (
              <div key={item.id} className={`analysis-item ${item.type}`}>
                <span className="icon">{item.type === "check" ? "✓" : "!"}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <button className="view-reviews-btn">전체 리뷰 보기</button>
        </section>
      </main>
    </div>
  );
}

export default PlaceDetail;