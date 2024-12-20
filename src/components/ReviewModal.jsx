import React, { useState } from "react";
import styled from "styled-components";
import { supabase } from "../api/supabase";
import { useNavigate } from "react-router-dom";

const ReviewModal = ({ initialDescription, onClose, id }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState(initialDescription || "");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (description.trim()) {
      setIsSaving(true); // 저장 시작
      try {
        // 수정하려는 경우 (id가 있을 때)
        if (id) {
          const { data, error } = await supabase
            .from("reports")
            .update({
              description: description, // description만 수정
              updated_at: new Date().toISOString(), // 수정 시간 기록
            })
            .eq("id", id); // 'id'로 조건을 걸어 해당 게시글 업데이트

          if (error) {
            throw error; // 에러 발생 시 예외 처리
          }

          alert("독후감이 수정되었습니다!"); // 성공 메시지
          navigate("/mybook");
        } else {
          setError("잘못된 요청입니다.");
        }
      } catch (error) {
        console.error("저장 중 오류:", error); // 오류 로그 추가
        setError("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsSaving(false); // 저장 완료
      }
    } else {
      setError("내용을 입력해주세요."); // 내용이 없으면 에러 메시지 표시
    }
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value.trim()) {
      setError(""); // 입력이 있을 때 에러 메시지 초기화
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>독후감을 수정해주세요!</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <Content>
          <Textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="내용을 입력하세요."
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Content>
        <Footer>
          <ActionButton
            onClick={handleSave}
            className="save"
            disabled={isSaving}
          >
            {isSaving ? "저장 중..." : "저장"}
          </ActionButton>
          <ActionButton onClick={onClose} className="cancel">
            취소
          </ActionButton>
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #007bff;
  color: white;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Content = styled.div`
  padding: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  background: #f9f9f9;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: white;

  &.save {
    background: #28a745;

    &:hover {
      background: #218838;
    }

    &:disabled {
      background: #d6f1d6;
      cursor: not-allowed;
    }
  }

  &.cancel {
    background: #dc3545;

    &:hover {
      background: #c82333;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 12px;
  margin-top: 8px;
`;

export default ReviewModal;
