import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "../api/supabase";
import ReviewModal from "../components/ReviewModal";
import Swal from "sweetalert2";

const BookReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching book data:", error);
      } else {
        setBook(data);
      }
      setLoading(false);
    };

    fetchBook();
  }, [id]);

  const handleSaveDescription = async (newDescription) => {
    const { data, error } = await supabase
      .from("reports")
      .update({ description: newDescription })
      .eq("id", id);

    if (error) {
      console.error("Error updating description:", error);
    } else {
      setBook((prevBook) => ({ ...prevBook, description: newDescription }));
      setIsModalOpen(false);
    }
  };

  const handleDelete = async () => {
    // 삭제 확인 알림
    const result = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제된 후에는 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "삭제",
      reverseButtons: true, // 버튼 순서 변경
    });

    // 사용자가 '삭제' 버튼을 클릭하면 삭제 진행
    if (result.isConfirmed) {
      try {
        const { error } = await supabase.from("reports").delete().eq("id", id);

        if (error) {
          throw error;
        }

        Swal.fire("삭제 완료!", "독후감이 삭제되었습니다.", "success");
        navigate("/mybook");
      } catch (error) {
        console.error("Error deleting review:", error);
        Swal.fire(
          "삭제 실패!",
          "삭제 중 오류가 발생했습니다. 다시 시도해주세요.",
          "error"
        );
      }
    }
  };

  if (loading) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    );
  }

  if (!book) {
    return <div>책 정보를 찾을 수 없습니다.</div>;
  }

  const { image_url, author, description, title } = book;

  return (
    <Container>
      <BookInfo>
        <BookImage
          src={image_url || "https://via.placeholder.com/100x150"}
          alt="Book Cover"
        />
        <BookDetails>
          <BookTitle>{title || "제목이 없습니다"}</BookTitle>
          <Author>저자: {author || "알 수 없음"}</Author>
        </BookDetails>
      </BookInfo>
      <DescriptionSection>
        <DescriptionText readOnly>
          {description || "아직 독후감이 작성되지 않았습니다!"}
        </DescriptionText>
      </DescriptionSection>
      <ButtonGroup>
        <ActionButton className="edit" onClick={() => setIsModalOpen(true)}>
          작성
        </ActionButton>
        <ActionButton className="delete" onClick={handleDelete}>
          삭제
        </ActionButton>
      </ButtonGroup>

      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialDescription={description}
          onSave={handleSaveDescription}
          id={id}
        />
      )}
    </Container>
  );
};

// 스타일드 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  background-color: #fdfdfd;
  border: 1px solid #eaeaea;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BookImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BookTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const Author = styled.p`
  font-size: 16px;
  margin: 0;
  color: #555;
`;

const DescriptionSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const DescriptionText = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: none;
  resize: none;
  font-size: 14px;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.2s, transform 0.1s;

  &.edit {
    background-color: #28a745;
    &:hover {
      background-color: #218838;
      transform: scale(1.05);
    }
  }

  &.delete {
    background-color: #dc3545;
    &:hover {
      background-color: #c82333;
      transform: scale(1.05);
    }
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top: 6px solid #007bff; /* 메인 컬러 */
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

export default BookReview;
