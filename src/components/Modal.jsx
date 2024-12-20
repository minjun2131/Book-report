import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../api/supabase";

const Modal = ({ isOpen, onClose, book }) => {
  const [userId, setUserId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  // 사용자 ID와 찜 상태 미리 로드
  useEffect(() => {
    const prepareData = async () => {
      setLoading(true);
      setIsDataReady(false);

      try {
        // 사용자 ID 가져오기
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData.user.id;
        setUserId(userId);

        // 찜 상태 가져오기
        if (book?.title) {
          const { data: favoriteData, error: favoriteError } = await supabase
            .from("reports")
            .select("id")
            .eq("title", book.title)
            .eq("user_id", userId);

          if (favoriteError) throw favoriteError;

          setIsFavorite(favoriteData && favoriteData.length > 0);
        }
      } catch (error) {
        console.error("데이터 로드 중 오류:", error.message);
      } finally {
        setIsDataReady(true); // 데이터 준비 완료
        setLoading(false); // 로딩 종료
      }
    };

    if (isOpen) {
      prepareData();
    }
  }, [isOpen, book]);

  // 찜 추가/삭제 처리
  const toggleFavorite = async () => {
    if (!userId) {
      alert("로그인 후 찜하기 기능을 이용할 수 있습니다.");
      return;
    }

    // Optimistic UI 업데이트
    setIsFavorite((prev) => !prev);
    setLoading(true); // 로딩 시작

    try {
      if (isFavorite) {
        // 찜 해제
        const { error } = await supabase
          .from("reports")
          .delete()
          .eq("title", book.title)
          .eq("user_id", userId);

        if (error) throw error;
        console.log(`"${book.title}"이(가) 찜 목록에서 제거되었습니다.`);
      } else {
        // 찜 추가
        const { error } = await supabase.from("reports").insert([
          {
            title: book.title,
            description: null,
            author: book.author,
            image_url: book.image,
            user_id: userId,
          },
        ]);

        if (error) throw error;
        console.log(`"${book.title}"이(가) 찜 목록에 추가되었습니다.`);
      }
    } catch (error) {
      console.error("찜 처리 중 오류:", error.message);
      // 오류 발생 시 롤백
      setIsFavorite((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // 모달 자체는 isOpen에 의존

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        {isDataReady ? (
          <BookDetails>
            <BookImage src={book.image} alt={book.title} />
            <BookInfo>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                책 구매하기
              </a>
              <FavoriteButton onClick={toggleFavorite} disabled={loading}>
                {isFavorite ? "찜 해제" : "찜하기"}
              </FavoriteButton>
            </BookInfo>
          </BookDetails>
        ) : (
          <LoadingSpinner></LoadingSpinner> // 로딩 중 메시지 표시
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 400px; // 모달의 너비
  height: 500px; // 모달의 높이
  padding: 20px;
  border-radius: 12px; // 모서리 둥글게
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // 내용 간격 조절
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 22px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BookImage = styled.img`
  width: 150px;
  height: 250px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin: 5px 0;
  }

  a {
    font-size: 16px;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FavoriteButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  margin-top: 170px;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #007bff; /* 메인 컬러 */
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
