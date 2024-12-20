import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

function SignUpMethod({ onNext, onPrev }) {
  const [method, setMethod] = useState("");

  const handleSubmit = () => {
    if (!method) {
      Swal.fire({
        title: "가입 방식을 선택해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }
    if (method === "social") {
      Swal.fire({
        title: "현재는 이용하실 수 없습니다.",
        text: "이메일 방식으로 진행해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }
    const data = { method };
    onNext(data, "이메일");
  };

  return (
    <SignUpContainer>
      <Title>가입 방식 선택</Title>
      <SelectWrapper>
        <Select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="">선택하세요</option>
          <option value="email">이메일</option>
          <option value="social">소셜 로그인</option>
        </Select>
      </SelectWrapper>
      <Button onClick={handleSubmit}>다음</Button>
    </SignUpContainer>
  );
}

export default SignUpMethod;

const SignUpContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const SelectWrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
