import { useState } from "react";

const usePasswordValidation = () => {
  const [enterPassword, setEnterPassword] = useState("");
  const [validation, setValidation] = useState({
    message: "",
    color: "red",
  });
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setEnterPassword(password);
    if (!password) {
      setValidation({ message: "", color: "red" });
    } else {
      validatePassword(password);
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      return false;
    }
    if (!/^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(password)) {
      setValidation({
        message: "유효한 비밀번호 형식이 아닙니다.",
        color: "red",
      });
      return false;
    }
    setValidation({ message: "안전한 비밀번호 입니다.", color: "green" });
    return true;
  };

  return { enterPassword, validation, handlePasswordChange, validatePassword };
};

export default usePasswordValidation;
