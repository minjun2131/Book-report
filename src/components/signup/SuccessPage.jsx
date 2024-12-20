import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";
import styled from "styled-components";
import Swal from "sweetalert2";

const SuccessPage = ({ onPrev, userData }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("회원가입 데이터:", userData);
      const data = await signUp(userData.enterEmail, userData.enterPassword, {
        name: userData.enterName,
      });

      Swal.fire({
        title: "회원가입이 완료되었습니다!",
        icon: "success",
        confirmButtonText: "확인",
      });

      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error.message);

      Swal.fire({
        title: "회원가입 실패",
        text:
          error.message || "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <Container>
      <Title>회원가입을 하시겠습니까?</Title>
      <Message>잘못된 정보가 존재한다면 뒤로 가기 버튼을 눌러주세요.</Message>
      <Message>
        입력된 정보가 올바르다면
        <br /> 확인 버튼을 누르고 회원가입을 진행해주세요.
      </Message>
      <ButtonGroup>
        <Button onClick={onPrev}>이전</Button>
        <Button onClick={handleSubmit}>확인</Button>
      </ButtonGroup>
    </Container>
  );
};

export default SuccessPage;

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-top: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #555;
  margin: 10px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 5px;

  &:hover {
    background-color: #0056b3;
  }
`;
