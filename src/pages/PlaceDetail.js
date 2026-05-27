import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages_CSS/PlaceDetail.css";

const DUMMY_REVIEWS = [
  { id: 1, author: "김**", rating: 5, content: "분위기 너무 좋고 음식도 맛있어요! 재방문 의사 100%", created_at: "2026-04-10" },
  { id: 2, author: "이**", rating: 4, content: "가성비 좋은 편이에요. 주말엔 웨이팅 있으니 참고하세요.", created_at: "2026-04-22" },
  { id: 3, author: "박**", rating: 3, content: "맛은 괜찮은데 서비스가 조금 아쉬웠어요.", created_at: "2026-05-01" },
  { id: 4, author: "최**", rating: 5, content: "친구랑 왔는데 대만족! 사진도 잘 나와요 📸", created_at: "2026-05-08" },
];

// 백엔드 연결 시 placeData.images 배열로 교체
const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552566626-52f8b828329c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&h=400&fit=crop",
];

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + images.length) % images.length);
  const next = () => setCurrent((current + 1) % images.length);

  return (
    <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "12px", overflow: "hidden", background: "#eee" }}>
      <img
        src={images[current]}
        alt={`슬라이드 ${current + 1}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <button onClick={prev} style={{
        position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
        background: "rgba(0,0,0,0.4)", color: "white", border: "none",
        borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "18px"
      }}>‹</button>
      <button onClick={next} style={{
        position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
        background: "rgba(0,0,0,0.4)", color: "white", border: "none",
        borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "18px"
      }}>›</button>
      <div style={{
        position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: "6px"
      }}>
        {images.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: i === current ? "white" : "rgba(255,255,255,0.5)",
            cursor: "pointer"
          }} />
        ))}
      </div>
    </div>
  );
}

function PlaceDetail() {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 백엔드 연결 시 아래 더미 블록 삭제하고 주석 해제
    // try {
    //   const placeRes = await getPlaceDetail(id);
    //   const reviewRes = await getReviewsByPlace(id);
    //   setPlaceData(placeRes.data);
    //   setReviews(reviewRes.data);
    //   setLoading(false);
    // } catch (err) {
    //   console.error(err);
    // }

    setTimeout(() => {
      setPlaceData({
        name: "가게 A",
        address: "서울 강남구 역삼동",
        description: "상세 설명 영역입니다.",
        reliability: 85,
        reviewCount: 152,
        lat: 37.5012,
        lng: 127.0396,
        images: DUMMY_IMAGES, // 백엔드 연결 시 API 응답의 images 배열로 교체
        analysis: [
          { id: 1, text: "실제 방문자들의 긍정적인 반응이 많습니다.", type: "check" },
          { id: 2, text: "광고성 키워드 비중이 낮아 신뢰할 수 있습니다.", type: "check" },
          { id: 3, text: "최근 리뷰 중 일부 서비스 불만이 감지되었습니다.", type: "warning" },
        ],
      });
      setReviews(DUMMY_REVIEWS); // 백엔드 연결 시 getReviewsByPlace(id) 호출로 교체
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDirections = () => {
    if (!placeData) return;
    const { name, lat, lng } = placeData;

    const openMap = (myLat, myLng) => {
      const url = `https://map.kakao.com/link/from/현재위치,${myLat},${myLng}/to/${encodeURIComponent(name)},${lat},${lng}`;
      window.open(url, "_blank");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => openMap(pos.coords.latitude, pos.coords.longitude),
        () => {
          window.open(`https://map.kakao.com/link/to/${encodeURIComponent(name)},${lat},${lng}`, "_blank");
        }
      );
    } else {
      window.open(`https://map.kakao.com/link/to/${encodeURIComponent(name)},${lat},${lng}`, "_blank");
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) return <div className="loading-box">데이터 분석 중...</div>;

  return (
    <div className="place-detail-page">
      <Header />
      <main className="detail-container">
        <section className="info-card">
          <ImageSlider images={placeData.images} />
          <div className="text-info">
            <div className="title-row">
              <h2>{placeData.name}</h2>
              <button className="dir-btn" onClick={handleDirections}>
                📍 길찾기
              </button>
            </div>
            <p className="addr">주소 : {placeData.address}</p>
            <p className="desc">{placeData.description}</p>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', marginTop: '16px', flexWrap: 'nowrap' }}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ color: i < Math.round(avgRating) ? '#ffc107' : '#ddd', fontSize: '1.1rem', lineHeight: 1 }}>★</span>
              ))}
              <span style={{ fontWeight: 700, color: '#2a7fff', fontSize: '1.1rem' }}>{avgRating}</span>
              <span style={{ color: '#aaa', fontSize: '0.9rem' }}>({reviews.length}명)</span>
            </div>
          </div>
        </section>

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

      <Footer />
    </div>
  );
}

export default PlaceDetail;