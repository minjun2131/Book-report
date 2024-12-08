import useNameValidation from "../../hook/useNameValidation";

const EnterNickName = ({ onNext, onPrev }) => {
  const { enterName, validation, handleNameChange, validateName } =
    useNameValidation();

  const handleSubmit = () => {
    const isValid = validateName(enterName);
    if (isValid) {
      console.log(enterName);
      const data = { enterName };
      onNext(data, "가입성공");
    } else {
      alert("닉네임이 입력되었는지 다시 확인해주세요.");
    }
  };
  return (
    <div>
      <h2>닉네임 입력</h2>
      <input
        type="text"
        value={enterName}
        onChange={handleNameChange}
        placeholder="사용하실 닉네임을 입력해주세요."
      />
      {validation.message && (
        <p style={{ color: validation.color }}>{validation.message}</p>
      )}
      <button onClick={onPrev}>이전</button>
      <button onClick={handleSubmit}>다음</button>
    </div>
  );
};

export default EnterNickName;
