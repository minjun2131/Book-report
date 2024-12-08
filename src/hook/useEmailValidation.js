import { useState } from "react";

const useEmailValidation = () => {
  const [enterEmail, setEnterEmail] = useState("");
  const [validation, setValidation] = useState({
    message: "",
    color: "red",
  });
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEnterEmail(email);
    if (!email) {
      setValidation({ message: "", color: "red" });
    } else {
      validateEmail(email);
    }
  };

  const validateEmail = (email) => {
    if (!email) {
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidation({
        message: "유효한 이메일 형식이 아닙니다.",
        color: "red",
      });
      return false;
    }
    setValidation({ message: "유효한 이메일 입니다.", color: "green" });
    return true;
  };

  return { enterEmail, validation, handleEmailChange, validateEmail };
};

export default useEmailValidation;
