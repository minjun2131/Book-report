import { useState } from "react";

const EnterNickName = ({ onNext, onPrev }) => {
  const [enterNickName, setEnterNickName] = useState("");

  const handleSubmit = () => {
    if (!enterNickName) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    const data = { enterNickName };
    onNext(data, "가입성공");
  };
  return (
    <div>
      <h2>닉네임 입력</h2>
      <input
        type="text"
        value={enterNickName}
        onChange={(e) => setEnterNickName(e.target.value)}
        placeholder="사용하실 닉네임을 입력해주세요."
      />
      <button onClick={onPrev}>이전</button>
      <button onClick={handleSubmit}>다음</button>
    </div>
  );
};

export default EnterNickName;
