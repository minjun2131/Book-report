import { useNavigate } from "react-router-dom";

const SuccessPage = ({ userData }) => {
  // useData에 user 정보가 존재해서
  // -> 여기서 회원가입 진행해보기
  const navigate = useNavigate();
  const handleSubmit = () => {
    alert("회원가입이 완료되었습니다!");
    console.log("데이터 확인", userData);
    navigate("/login");
  };

  return (
    <div>
      <h2>가입 완료</h2>
      <p>가입이 완료되었습니다. 다음은 입력하신 정보입니다:</p>
      <ul>
        <li>이메일: {userData.enterEmail}</li>
        <li>비밀번호: {userData.enterPassword}</li>
        <li>닉네임: {userData.enterNickName}</li>
      </ul>
      <button onClick={handleSubmit}>확인</button>
    </div>
  );
};

export default SuccessPage;
