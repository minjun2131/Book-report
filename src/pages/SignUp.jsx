import { useState } from "react";
import useFunnel from "../hook/useFunnel";
import SignUpMethod from "../components/signup/SignUpMethod";
import EnterEmail from "../components/signup/EnterEmail";
import EnterPassword from "../components/signup/EnterPassword";
import EnterNickName from "../components/signup/EnterNickName";
import SuccessPage from "../components/signup/SuccessPage";
import styled from "styled-components";

const SignUp = () => {
  const { Funnel, Step, next, prev, currentStep } = useFunnel("회원가입");
  const [userData, setUserData] = useState({});

  const handleNext = (data, nextStep) => {
    setUserData((prev) => ({ ...prev, ...data }));
    next(nextStep);
  };

  const handlePrev = (prevStep) => {
    prev(prevStep);
  };

  return (
    <SignUpContainer>
      <Funnel>
        <Step name="회원가입">
          <StepCard>
            <SignUpMethod onNext={(data) => handleNext(data, "이메일")} />
          </StepCard>
        </Step>
        <Step name="이메일">
          <StepCard>
            <EnterEmail
              onNext={(data) => handleNext(data, "비밀번호")}
              onPrev={() => handlePrev("회원가입")}
            />
          </StepCard>
        </Step>
        <Step name="비밀번호">
          <StepCard>
            <EnterPassword
              onNext={(data) => handleNext(data, "닉네임")}
              onPrev={() => handlePrev("이메일")}
            />
          </StepCard>
        </Step>
        <Step name="닉네임">
          <StepCard>
            <EnterNickName
              onNext={(data) => handleNext(data, "가입성공")}
              onPrev={() => handlePrev("비밀번호")}
            />
          </StepCard>
        </Step>
        <Step name="가입성공">
          <StepCard>
            <SuccessPage
              userData={userData}
              onPrev={() => handlePrev("닉네임")}
            />
          </StepCard>
        </Step>
      </Funnel>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f9;
  padding: 20px;
`;

const StepCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default SignUp;
