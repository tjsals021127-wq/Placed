import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../pages_CSS/MainUser.css";

function RadiusModal({ distance, setDistance, onClose }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const circleInstance = useRef(null);
  const timerRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const initMap = () => {
      if (!isMounted.current) return;

      if (window.kakao && window.kakao.maps && mapRef.current) {
        try {
          const container = mapRef.current;
          const r = parseFloat(distance) * 1000;
          const center = new window.kakao.maps.LatLng(36.4523, 127.4258);

          const map = new window.kakao.maps.Map(container, {
            center: center,
            level: getZoomLevel(parseFloat(distance)),
          });
          mapInstance.current = map;

          const circle = new window.kakao.maps.Circle({
            map: map,
            center: center,
            radius: r,
            strokeWeight: 2,
            strokeColor: "#007bff",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
            fillColor: "#007bff",
            fillOpacity: 0.2,
          });
          circleInstance.current = circle;
        } catch (e) {
          console.warn("카카오 지도 초기화 실패:", e);
        }
      } else {
        timerRef.current = setTimeout(initMap, 300);
      }
    };

    initMap();

    return () => {
      isMounted.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      try {
        if (circleInstance.current) circleInstance.current.setMap(null);
      } catch (e) {}
      circleInstance.current = null;
      mapInstance.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    try {
      if (circleInstance.current) {
        const d = parseFloat(distance);
        circleInstance.current.setRadius(d * 1000);
        if (mapInstance.current) {
          mapInstance.current.setLevel(getZoomLevel(d));
        }
      }
    } catch (e) {}
  }, [distance]);

  const getZoomLevel = (d) => {
    if (d <= 0.5) return 4;
    if (d <= 1)   return 5;
    if (d <= 2)   return 6;
    if (d <= 3)   return 7;
    if (d <= 4)   return 8;
    return 8;
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center",
        alignItems: "center", zIndex: 9999,
      }}
    >
      <div
        className="modal-content"
        style={{ background: "white", padding: "30px", borderRadius: "20px", width: "900px" }}
      >
        <h3 style={{ marginBottom: "20px", fontWeight: "bold" }}>📍 검색 반경 설정</h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <div
            ref={mapRef}
            style={{ flex: 1.5, height: "450px", borderRadius: "12px", background: "#eee" }}
          ></div>
          <div
            style={{
              flex: 1, display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center",
            }}
          >
            <p>설정 거리: <strong>{distance}km</strong></p>
            <input
              type="range" min="0.5" max="5" step="0.5"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              style={{ width: "100%", margin: "20px 0" }}
            />
            <button
              onClick={onClose}
              style={{
                width: "100%", padding: "12px", background: "#007bff",
                color: "white", border: "none", borderRadius: "8px", cursor: "pointer",
              }}
            >
              적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainUser() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [distance, setDistance] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recommended = [
    { id: 1, name: "카페", img: "https://t4.ftcdn.net/jpg/16/79/44/21/240_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg" },
    { id: 2, name: "식당", img: "https://t4.ftcdn.net/jpg/16/79/44/21/240_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg" },
    { id: 3, name: "스터디룸", img: "https://t4.ftcdn.net/jpg/16/79/44/21/240_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg" },
  ];

  return (
    <div className="user-page">
      <Header />
      <section className="welcome" style={{ textAlign: "center", padding: "60px 0" }}>
        <h1>안녕하세요 👋</h1>
        <p>당신에게 어울리는 새로운 공간을 찾아보세요.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?keyword=${keyword}&dist=${distance}`);
          }}
          style={{ margin: "20px 0" }}
        >
          <input
            type="text"
            placeholder="어디로 갈까요?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              padding: "12px", width: "350px", border: "1px solid #ddd",
              borderRadius: "30px 0 0 30px", outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 25px", background: "#007bff", color: "white",
              border: "none", borderRadius: "0 30px 30px 0",
            }}
          >
            검색
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            background: "white", border: "1px solid #ddd", borderRadius: "20px",
            padding: "10px 20px", cursor: "pointer",
          }}
        >
          ⚙️ 검색 반경 설정 ({distance}km)
        </button>
      </section>

      {isModalOpen && (
        <RadiusModal
          distance={distance}
          setDistance={setDistance}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <section className="recommend" style={{ padding: "40px", textAlign: "center" }}>
        <h2>오늘의 추천 장소</h2>
        <div
          className="card-grid"
          style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}
        >
          {recommended.map((place) => (
            <div
              key={place.id}
              className="card"
              style={{
                border: "1px solid #eee", borderRadius: "15px",
                padding: "15px", width: "150px", background: "white",
              }}
            >
              <img src={place.img} alt={place.name} style={{ width: "100%", borderRadius: "10px" }} />
              <h4 style={{ marginTop: "10px" }}>{place.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "24px", color: "#aaa", fontSize: "0.85rem", borderTop: "1px solid #eef0f3" }}>
        © 2026 PLACED | <a href="#" style={{ color: "#aaa", textDecoration: "none" }}>이용약관</a> | <a href="#" style={{ color: "#aaa", textDecoration: "none" }}>개인정보처리방침</a>
      </footer>
    </div>
  );
}

export default MainUser;