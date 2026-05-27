import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, checkDuplicateId } from "../api/userAPI";
import "../pages_CSS/Signup.css";

function Signup() {
  const navigate = useNavigate();
  
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");

  const handleCheckDuplicate = async () => {
    if (!id.trim()) return alert("아이디를 입력하세요!");
    try {
      const res = await checkDuplicateId(id);  
      res.data.isAvailable
        ? alert("사용 가능한 아이디입니다!")
        : alert("이미 사용 중인 아이디입니다.");
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
      await signupUser(id, password, name);
      alert("회원가입 완료! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="placed-logo">PLACED</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>이메일 계정</label>
            <div className="input-row">
              <input
                type="text"
                placeholder="user@example.com"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
              <button type="button" className="check-btn" onClick={handleCheckDuplicate}>
                중복 확인
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="8자 이상 영문/숫자 조합"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 다시 입력"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>이름</label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">가입하기</button>
        </form>

        <p className="login-prompt">
          이미 계정이 있으신가요?{" "}
          <span onClick={() => navigate("/login")}>로그인</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;