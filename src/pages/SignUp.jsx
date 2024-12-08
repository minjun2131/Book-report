import { useState } from "react";
import useFunnel from "../hook/useFunnel";
import SignUpMethod from "../components/signup/SignUpMethod";
import EnterEmail from "../components/signup/EnterEmail";
import EnterPassword from "../components/signup/EnterPassword";
import EnterNickName from "../components/signup/EnterNickName";
import SuccessPage from "../components/signup/SuccessPage";

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
    <Funnel>
      <Step name="회원가입">
        <SignUpMethod onNext={(data) => handleNext(data, "이메일")} />
      </Step>
      <Step name="이메일">
        <EnterEmail
          onNext={(data) => handleNext(data, "비밀번호")}
          onPrev={() => handlePrev("회원가입")}
        />
      </Step>
      <Step name="비밀번호">
        <EnterPassword
          onNext={(data) => handleNext(data, "닉네임")}
          onPrev={() => handlePrev("이메일")}
        />
      </Step>
      <Step name="닉네임">
        <EnterNickName
          onNext={(data) => handleNext(data, "가입성공")}
          onPrev={() => handlePrev("비밀번호")}
        />
      </Step>
      <Step name="가입성공">
        <SuccessPage userData={userData} onPrev={() => handlePrev("닉네임")} />
      </Step>
    </Funnel>
  );
};

export default SignUp;
