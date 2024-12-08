import { useState } from "react";

const useNameValidation = () => {
  const [enterName, setEnterName] = useState("");
  const [validation, setValidation] = useState({
    message: "",
    color: "red",
  });
  const handleNameChange = (e) => {
    const nickName = e.target.value;
    setEnterName(nickName);
    if (!nickName) {
      setValidation({ message: "", color: "red" });
    } else {
      validateName(nickName);
    }
  };

  const validateName = (nickName) => {
    if (!nickName) {
      setValidation({ message: "닉네임을 입력해주세요.", color: "red" });
      return false;
    }
    if (nickName.length < 2) {
      setValidation({
        message: "닉네임은 최소 2글자 이상입니다.",
        color: "red",
      });
      return false;
    }
    setValidation({ message: "닉네임이 입력되었습니다.", color: "green" });
    return true;
  };

  return { enterName, validation, handleNameChange, validateName };
};

export default useNameValidation;
