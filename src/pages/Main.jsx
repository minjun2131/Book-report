import { useRef, useState, useEffect } from "react";
import useBooksQuery from "../api/booksApi";
import styled from "styled-components";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";

const Main = () => {
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadMoreRef = useRef(null);

  // useBooksQuery 훅을 사용하여 데이터 가져오기
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useBooksQuery(searchQuery);

  const handleSearch = () => {
    setSearchQuery(inputRef.current.value);
  };

  // IntersectionObserver 사용
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <SearchWrapper>
          <Input ref={inputRef} type="text" placeholder="Search for books" />
          <Button type="button" onClick={handleSearch}>
            Search
          </Button>
        </SearchWrapper>
        {!data?.pages?.length && (
          <NoResultsMessage>
            아직 검색된 정보가 존재하지 않습니다.
          </NoResultsMessage>
        )}
        {isLoading && <LoadingMessage></LoadingMessage>}
        {isError && <ErrorMessage>Error occurred!</ErrorMessage>}

        {!isLoading && data && (
          <div>
            {data.pages.map((page, index) => (
              <BookGrid key={index}>
                {page.items.map((book) => (
                  <BookCard key={book.isbn} onClick={() => openModal(book)}>
                    <img src={book.image} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <p>{book.publisher}</p>
                  </BookCard>
                ))}
              </BookGrid>
            ))}
          </div>
        )}

        {isFetchingNextPage && <LoadingMessage>Loading more...</LoadingMessage>}

        <LoadMoreWrapper ref={loadMoreRef}></LoadMoreWrapper>
        <Modal isOpen={isModalOpen} onClose={closeModal} book={selectedBook} />
      </MainContent>
    </Container>
  );
};

export default Main;

// Styled-components
const NoResultsMessage = styled.p`
  font-size: 18px;
  color: #555;
  margin-top: 120px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  flex-direction: row;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: margin-left 0.3s ease-in-out;
  margin-left: 250px;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 400px;
  padding: 10px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoadingMessage = styled.div`
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

const ErrorMessage = styled.p`
  font-size: 18px;
  color: red;
  margin: 20px 0;
`;

const BookGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  cursor: pointer;
`;

const BookCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    max-width: 100px;
    height: auto;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 16px;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    margin: 5px 0;
  }

  a {
    font-size: 14px;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoadMoreWrapper = styled.div`
  width: 100%;
  height: 30px;
`;
