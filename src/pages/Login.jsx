import { useState } from "react";
import useToggle from "../hook/useToggle";
import { signIn } from "../api/auth";
import { useNavigate } from "react-router-dom";
import uploadProfileImage from "../services/uploadDefaultImage";
import styled from "styled-components";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, togglePasswordVisibility] = useToggle(false);

  const enterEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const enterPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signIn(loginEmail, loginPassword);
      if (data.user) {
        console.log("로그인 성공:", data);
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error.message);
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: "비밀번호가 입력되지 않았습니다.",
      });
    }

    console.log(loginEmail, loginPassword);
  };

  return (
    <Wrapper>
      <Form onSubmit={loginSubmit}>
        <Title>로그인</Title>
        <InputWrapper>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="text"
            onChange={enterEmail}
            placeholder="아이디를 입력해주세요."
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={enterPassword}
            placeholder="비밀번호를 입력해주세요."
          />
          <ToggleButton type="button" onClick={togglePasswordVisibility}>
            비밀번호 보기
          </ToggleButton>
        </InputWrapper>

        <ButtonWrapper>
          <SubmitButton type="submit">입력</SubmitButton>
          <SignUpButton onClick={() => navigate("/signup")}>
            회원가입
          </SignUpButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

const Form = styled.form`
  background-color: #fff;
  max-width: 500px;
  width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #333;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  font-size: 16px;
  margin-top: 5px;
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  width: 48%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignUpButton = styled.button`
  width: 48%;
  padding: 12px;
  background-color: #f4f4f4;
  color: #007bff;
  font-size: 16px;
  border: 1px solid #007bff;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #e6f1ff;
  }
`;

export default Login;
