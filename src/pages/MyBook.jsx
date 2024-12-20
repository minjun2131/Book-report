import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../api/auth";
import Swal from "sweetalert2";

const MyBook = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [profileImage, setProfileImage] = useState("/default.png");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserDataAndBooks = async () => {
      try {
        // 사용자 정보 가져오기
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;

        const user = userData?.user;
        setUser(user);

        if (!user?.id) return;

        // 책 정보 가져오기
        const { data: booksData, error: booksError } = await supabase
          .from("reports")
          .select("title, author, image_url, description , id")
          .eq("user_id", user.id);

        if (booksError) throw booksError;
        setBooks(booksData);

        // 독후감 개수 계산
        setReviewsCount(booksData.filter((book) => book.description).length);

        const folderPath = `profile_images/${user.id}`;
        const { data: files, error: listError } = await supabase.storage
          .from("profile_images")
          .list(user.id);

        if (listError) {
          console.error("Error listing files:", listError);
          throw listError;
        }

        const targetFile = files.find((file) => file.name.includes("default"));

        if (targetFile) {
          const { publicURL, error: publicUrlError } = supabase.storage
            .from("profile_images")
            .getPublicUrl(`${folderPath}/${targetFile.name}`);

          if (publicUrlError) {
            console.error("Error generating public URL:", publicUrlError);
            throw publicUrlError;
          }

          setProfileImage(publicURL);
        } else {
          // 프로필 이미지가 없으면 기본 이미지 사용
          setProfileImage("/default.png");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndBooks();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "정말로 로그아웃 하시겠습니까?",
        text: "이 작업은 되돌릴 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니오",
      });

      if (result.isConfirmed) {
        await signOut();
        navigate("/");
        console.log("로그아웃 처리");
      } else {
        console.log("취소");
      }
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다.", error);
    }
  };

  if (loading)
    return (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    );
  if (error) return <p>{error}</p>;

  return (
    <MyPageContainer>
      <ProfileSection>
        <ProfileImage src={profileImage} alt="Profile" />

        <ProfileInfo>
          <div>
            <h2>{user?.user_metadata?.name || "Guest"}</h2>
            <p>저장한 책: {books.length}권</p>
            <p>작성한 독후감: {reviewsCount}개</p>
            <EditButton onClick={() => navigate("/")}>책 검색하기</EditButton>
          </div>
          <StyledLogout onClick={handleLogout}>로그아웃</StyledLogout>
        </ProfileInfo>
      </ProfileSection>

      <BookListSection>
        <BookListTitle>저장한 책</BookListTitle>
        {books.length === 0 ? (
          <p>정보가 없습니다.</p>
        ) : (
          <BookCardContainer>
            {books.map((book, index) => (
              <BookCard key={index}>
                <BookLink to={`/review/${book.id}`}>
                  <BookCover
                    src={book.image_url || "/default-book-cover.jpg"}
                    alt={book.title}
                  />
                  <BookTitle>{book.title}</BookTitle>
                  <BookAuthor>{book.author}</BookAuthor>
                </BookLink>
              </BookCard>
            ))}
          </BookCardContainer>
        )}
      </BookListSection>

      {/* Stats Section */}
      <StatsSection>
        <div>
          <h4>저장한 책</h4>
          <p>{books.length}권</p>
        </div>
        <div>
          <h4>작성한 독후감</h4>
          <p>{reviewsCount}개</p>
        </div>
      </StatsSection>
    </MyPageContainer>
  );
};

export default MyBook;

const MyPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #cccccc;
`;

const EditButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfileInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  h2 {
    font-size: 1.5rem;
    color: #333333;
    margin: 0;
  }

  div {
    width: 100%;
  }

  p {
    font-size: 1rem;
    color: #666666;
    margin: 5px 0 0;
  }
  span {
    width: 70px;
    display: inline-block;
  }
`;

const BookListSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookListTitle = styled.h3`
  font-size: 1.5rem;
  color: #333333;
  margin-bottom: 20px;
`;

const BookCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const BookCard = styled.div`
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 200px;
  text-align: center;
`;
const BookCover = styled.img`
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const BookTitle = styled.h4`
  font-size: 1rem;
  color: #333333;
  margin: 10px 0 0;
`;

const BookAuthor = styled.p`
  font-size: 0.9rem;
  color: #666666;
  margin: 0;
`;

const StyledLogout = styled.span`
  cursor: pointer;
  color: #000;
  font-size: 16px;
  &:hover {
    color: #ccc;
  }
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  div {
    text-align: center;

    h4 {
      font-size: 1.2rem;
      color: #333333;
    }

    p {
      font-size: 1rem;
      color: #666666;
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
