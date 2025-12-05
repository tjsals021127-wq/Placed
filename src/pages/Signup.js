import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, checkDuplicateId } from "../api/userAPI";
import "../pages_CSS/Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleCheckDuplicate = async () => {
    if (!id.trim()) return alert("아이디를 입력하세요!");

    try {
      const res = await checkDuplicateId(id);   // ⭐ API 사용
      res.data.exists
        ? alert("이미 사용 중인 아이디입니다.")
        : alert("사용 가능한 아이디입니다!");
    } catch (err) {
      console.error(err);
      alert("중복확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return alert("비밀번호가 일치하지 않습니다!");
    }

    try {
      await signupUser(id, password);  // ⭐ API 사용
      alert("회원가입 완료! 로그인 페이지로 이동합니다.");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>PLACED 회원가입</h1>

        <form onSubmit={handleSubmit}>
          <div className="email-check">
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <button type="button" onClick={handleCheckDuplicate}>
              중복확인
            </button>
          </div>

          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button type="submit">회원가입</button>
        </form>

        <p className="login-link">
          이미 계정이 있으신가요?{" "}
          <span onClick={() => navigate("/login")}>로그인하기</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
