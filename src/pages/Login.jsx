import { useState } from "react";
import useToggle from "../hook/useToggle";

const Login = () => {
  const [value, setValue] = useState();
  const [showPassword, togglePasswordVisibility] = useToggle(false);

  return (
    <form>
      <div>
        <label name="email" value="email" />
        <input
          id="email"
          type="text"
          onChange={value}
          placeholder="아이디를 입력해주세요."
        />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          onChange={value}
          placeholder="비밀번호를 입력해주세요."
        />
        <button type="button" onClick={togglePasswordVisibility}>
          비밀번호 보기
        </button>
        <button>입력</button>
      </div>
    </form>
  );
};

export default Login;
