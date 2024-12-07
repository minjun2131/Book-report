import { useState } from "react";

const EnterEmail = ({ onNext, onPrev }) => {
  const [enterEmail, setEnterEmail] = useState("");

  const handleSubmit = () => {
    if (!enterEmail) {
      alert("이메일을 입력해주세요");
      return;
    }
    const data = { enterEmail };
    onNext(data, "비밀번호");
  };
  return (
    <div>
      <h2>이메일 입력</h2>
      <input
        type="text"
        value={enterEmail}
        onChange={(e) => setEnterEmail(e.target.value)}
        placeholder="example@naver.com"
      />
      <button onClick={onPrev}>이전</button>
      <button onClick={handleSubmit}>다음</button>
    </div>
  );
};

export default EnterEmail;
