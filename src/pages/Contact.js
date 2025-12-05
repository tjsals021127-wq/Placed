import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInquiry } from "../api/inquiryAPI";  // ⭐ API 함수 호출
import "../pages_CSS/Contact.css";

function Contact() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("문의 선택");
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (category === "문의 선택" || !message.trim()) {
      alert("문의 유형과 내용을 입력해주세요.");
      return;
    }

    try {
      await createInquiry(category, message); // ⭐ axios 대신 API 함수 호출!

      alert("문의가 정상적으로 접수되었습니다!");
      setCategory("문의 선택");
      setMessage("");

    } catch (error) {
      console.error(error);
      alert("문의 접수 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="user-header">
        <div className="logo" onClick={() => navigate("/main")}>
          <img src="/placed_logo.png" alt="PLACED Logo" className="logo-img" />
          <span className="logo-text">PLACED</span>
        </div>

        <nav className="nav">
          <button onClick={() => navigate("/main")}>홈</button>
          <button onClick={() => alert("내 리뷰 페이지 준비 중!")}>내 리뷰</button>
          <button onClick={() => navigate("/inquiries")}>문의하기</button>
          <button className="logout" onClick={handleLogout}>로그아웃</button>
        </nav>
      </header>

      {/* Body */}
      <section className="contact-section">
        <h2>문의하기</h2>
        <p>서비스 이용 중 불편사항이나 제안이 있다면 알려주세요</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>문의 선택</option>
            <option>오류 신고</option>
            <option>기능 제안</option>
            <option>계정 관련</option>
            <option>기타</option>
          </select>

          <textarea
            placeholder="문의 내용을 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button type="submit">문의 보내기</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 PLACED | <a href="#">이용약관</a> |{" "}
        <a href="#">개인정보처리방침</a>
      </footer>
    </div>
  );
}

export default Contact;
