import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages_CSS/MainUser.css";

function MainUser() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

 
  const handleSearch = (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      alert("검색어를 입력하세요!");
      return;
    }

    navigate(`/search?keyword=${keyword}`);
  };

  const recommended = [
    {
      id: 1,
      name: "카페",
      img: "https://t4.ftcdn.net/jpg/16/79/44/21/240_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg",
    },
    {
      id: 2,
      name: "식당",
      img: "https://t4.ftcdn.net/jpg/16/79/44/21/240_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg",
    },
    {
      id: 3,
      name: "스터디룸",
      img: "https://t4.ftcdn.net/jpg/16/79/44/21/240_F_1679442196_OEsi0AFKie6hYMBpvmXwwRgRYGV4U6Lz.jpg",
    },
  ];

  return (
    <div className="user-page">
    
      <header className="user-header">
        <div className="logo" onClick={() => navigate("/main")}>
          <img src="/placed_logo.png" alt="PLACED Logo" className="logo-img" />
          <span className="logo-text">PLACED</span>
        </div>

        <nav className="nav">
          <button onClick={() => navigate("/main")}>홈</button>
         <button onClick={() => navigate("/reviews")}>내 리뷰</button>
          <button onClick={() => navigate("/inquiries")}>문의하기</button>
          <button className="logout" onClick={handleLogout}>
            로그아웃
          </button>
        </nav>
      </header>

     
      <section className="welcome">
        <h2>안녕하세요 👋</h2>
        <p>당신에게 어울리는 새로운 공간을 찾아보세요.</p>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">검색</button>
        </form>
      </section>

      
      <section className="recommend">
        <h3>오늘의 추천 장소</h3>
        <div className="card-grid">
          {recommended.map((place) => (
            <div key={place.id} className="card">
              <img src={place.img} alt={place.name} />
              <div className="card-info">
                <h4>{place.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <footer className="footer">
        © 2025 PLACED | <a href="#">이용약관</a> |{" "}
        <a href="#">개인정보처리방침</a>
      </footer>
    </div>
  );
}

export default MainUser;
