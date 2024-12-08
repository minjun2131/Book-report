import useEmailValidation from "../../hook/useEmailValidation";

const EnterEmail = ({ onNext, onPrev }) => {
  const { enterEmail, validation, handleEmailChange, validateEmail } =
    useEmailValidation();

  const handleSubmit = () => {
    const isValid = validateEmail(enterEmail);
    if (isValid) {
      const data = { enterEmail };
      onNext(data, "비밀번호");
    } else {
      alert("실시간 유효성 검사를 다시 확인해주세요.");
    }
  };

  return (
    <div>
      <h2>이메일 입력</h2>
      <input
        type="text"
        value={enterEmail}
        onChange={handleEmailChange}
        placeholder="example@naver.com"
      />
      {validation.message && (
        <p style={{ color: validation.color }}>{validation.message}</p>
      )}
      <button onClick={onPrev}>이전</button>
      <button onClick={handleSubmit}>다음</button>
    </div>
  );
};

export default EnterEmail;
