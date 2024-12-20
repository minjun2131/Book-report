import Swal from "sweetalert2";
import useEmailValidation from "../../hook/useEmailValidation";
import styled from "styled-components";

const EnterEmail = ({ onNext, onPrev }) => {
  const { enterEmail, validation, handleEmailChange, validateEmail } =
    useEmailValidation();

  const handleSubmit = () => {
    const isValid = validateEmail(enterEmail);
    if (isValid) {
      const data = { enterEmail };
      onNext(data, "비밀번호");
    } else {
      Swal.fire({
        title: "실시간 유효성 검사를 다시 확인해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <Container>
      <Title>이메일 입력</Title>
      <InputWrapper>
        <Input
          type="text"
          value={enterEmail}
          onChange={handleEmailChange}
          placeholder="example@naver.com"
        />
        {validation.message && (
          <ValidationMessage color={validation.color}>
            {validation.message}
          </ValidationMessage>
        )}
      </InputWrapper>
      <ButtonGroup>
        <Button onClick={onPrev}>이전</Button>
        <Button onClick={handleSubmit}>다음</Button>
      </ButtonGroup>
    </Container>
  );
};

export default EnterEmail;

const Container = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin-top: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
  }
`;

const ValidationMessage = styled.p`
  font-size: 12px;
  color: ${({ color }) => color || "#ff0000"};
  margin-top: 5px;
  text-align: left;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
