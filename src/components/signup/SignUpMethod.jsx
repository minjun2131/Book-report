import { useState } from "react";

function SignUpMethod({ onNext, onPrev }) {
  const [method, setMethod] = useState("");

  const handleSubmit = () => {
    if (!method) {
      alert("가입 방식을 선택해주세요.");
      return;
    }
    const data = { method };
    onNext(data, "이메일");
  };

  return (
    <div>
      <h2>가입 방식 선택</h2>
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="">선택하세요</option>
        <option value="email">이메일</option>
        <option value="social">소셜 로그인</option>
      </select>
      <button onClick={handleSubmit}>다음</button>
    </div>
  );
}

export default SignUpMethod;
