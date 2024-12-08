import useToggle from "../../hook/useToggle";
import usePasswordValidation from "../../hook/usePasswordValidation";

const EnterPassword = ({ onNext, onPrev }) => {
  const [showPassword, togglePasswordVisibility] = useToggle(false);

  const { enterPassword, validation, handlePasswordChange, validatePassword } =
    usePasswordValidation();

  const handleSubmit = () => {
    const isValid = validatePassword(enterPassword);
    if (isValid) {
      const data = { enterPassword };
      onNext(data, "닉네임");
    } else {
      alert("실시간 유효성 검사를 다시 확인해주세요.");
    }
  };
  return (
    <div>
      <h2>비밀번호 입력</h2>
      <input
        type={showPassword ? "text" : "password"}
        value={enterPassword}
        onChange={handlePasswordChange}
        placeholder="비밀번호 입력"
      />
      {validation.message && (
        <p style={{ color: validation.color }}>{validation.message}</p>
      )}
      <button type="button" onClick={togglePasswordVisibility}>
        비밀번호 보기
      </button>
      <button onClick={onPrev}>이전</button>
      <button onClick={handleSubmit}>다음</button>
    </div>
  );
};

export default EnterPassword;
