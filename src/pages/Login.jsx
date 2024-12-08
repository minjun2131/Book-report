import { useState } from "react";
import useToggle from "../hook/useToggle";
import { signIn } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, togglePasswordVisibility] = useToggle(false);

  const enterEmail = (e) => {
    setLoginEmail(e.target.value);
  };
  const enterPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn(loginEmail, loginPassword);
      console.log("로그인 성공:", data);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error.message);
    }
    console.log(loginEmail, loginPassword);
  };
  return (
    <form onSubmit={loginSubmit}>
      <div>
        <label htmlFor="email" value="email" />
        <input
          type="text"
          onChange={enterEmail}
          placeholder="아이디를 입력해주세요."
        />
        <label htmlFor="password" value="password" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          onChange={enterPassword}
          placeholder="비밀번호를 입력해주세요."
        />
        <button type="button" onClick={togglePasswordVisibility}>
          비밀번호 보기
        </button>
        <button type="submit">입력</button>
      </div>
    </form>
  );
};

export default Login;
