import { useState } from "react";

const EnterPassword = ({ onNext, onPrev }) => {
  const [enterPassword, setEnterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = () => {
    if (!enterPassword) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    const data = { enterPassword };
    onNext(data, "비밀번호 확인");
  };
  return (
    <div>
      <h2>비밀번호 입력</h2>
      <input
        type={showPassword ? "text" : "password"}
        value={enterPassword}
        onChange={(e) => setEnterPassword(e.target.value)}
        placeholder="비밀번호 입력"
      />
      <button type="button" onClick={togglePasswordVisibility}>
        비밀번호 보기
      </button>
      <button onClick={onPrev}>이전</button>
      <button onClick={handleSubmit}>다음</button>
    </div>
  );
};

export default EnterPassword;
