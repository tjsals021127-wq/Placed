import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RadiusModal from "../components/RadiusModal";
import "../pages_CSS/MainUser.css";

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