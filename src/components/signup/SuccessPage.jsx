import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";

const SuccessPage = ({ onPrev, userData }) => {
  console.log(userData);
  // useData에 user 정보가 존재해서
  // -> 여기서 회원가입 진행해보기
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      console.log("데이터 확인", userData);
      const data = await signUp(userData.enterEmail, userData.enterPassword, {
        name: userData.enterName,
      });
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error.message);
    }
  };

  return (
    <div>
      <h2>회원가입을 하시겠습니까?</h2>
      <p>잘못된 정보가 존재한다면 뒤로 가기 버튼을 눌러주세요.</p>
      <p>입력된 정보가 올바르다면 확인을 누르고 회원가입을 진행해주세요.</p>
      <ul>
        <li>이메일: {userData.enterEmail}</li>
        <li>비밀번호: {userData.enterPassword}</li>
        <li>닉네임: {userData.enterName}</li>
      </ul>
      <button onClick={onPrev}>이전</button>
      <button onClick={handleSubmit}>확인</button>
    </div>
  );
};

export default SuccessPage;
