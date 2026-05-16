import React, { useEffect, useState } from "react";
// import { getMyPlaces, deleteMyPlace } from "../api/placeAPI"; // 백엔드 연결 시 주석 해제
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../pages_CSS/MyPlaces.css";

// ✅ 더미데이터 - 백엔드 연결 시 삭제
const DUMMY_PLACES = [
  {
    id: 1,
    place_name: "성심당 본점",
    address: "대전 중구 대종로 480번길 15",
  },
  {
    id: 2,
    place_name: "카페 온도",
    address: "대전 유성구 궁동 456-1",
  },
  {
    id: 3,
    place_name: "대전 엑스포 과학공원",
    address: "대전 유성구 대덕대로 480",
  },
];

function MyPlaces() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 백엔드 연결 시 아래 더미 블록 삭제하고 주석 해제
    // getMyPlaces()
    //   .then((res) => setPlaces(res.data))
    //   .catch((err) => console.error(err))
    //   .finally(() => setLoading(false));

    // ✅ 더미데이터 (백엔드 연결 시 삭제)
    setTimeout(() => {
      setPlaces(DUMMY_PLACES);
      setLoading(false);
    }, 300);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("찜 목록에서 삭제하시겠습니까?")) return;

    // 백엔드 연결 시 아래 더미 블록 삭제하고 주석 해제
    // deleteMyPlace(id)
    //   .then(() => setPlaces((prev) => prev.filter((p) => p.id !== id)))
    //   .catch((err) => console.error(err));

    // ✅ 더미 삭제 (백엔드 연결 시 삭제)
    setPlaces((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p className="loading">불러오는 중...</p>;

  return (
    <div className="places-page">
      <Header />

      <section className="places-section">
        <h2>내 장소 <span className="places-count">({places.length}개)</span></h2>

        {places.length === 0 ? (
          <p className="empty">저장된 장소가 없습니다.</p>
        ) : (
          <ul className="places-list">
            {places.map((p) => (
              <li key={p.id} className="place-item">
                <div className="place-info">
                  <h4>{p.place_name}</h4>
                  <p>{p.address}</p>
                </div>
                <div className="place-actions">
                  <button
                    className="detail-btn"
                    onClick={() => navigate(`/place/${p.id}`)}
                  >
                    상세보기
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p.id)}
                  >
                    찜 해제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="footer">
        © 2025 PLACED | <a href="#">이용약관</a> | <a href="#">개인정보처리방침</a>
      </footer>
    </div>
  );
}

export default MyPlaces;