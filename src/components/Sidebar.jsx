import { useEffect, useState } from "react";
import { supabase } from "../api/supabase"; // supabase 설정을 가져옵니다
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [user, setUser] = useState(null); // 사용자 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 사용자 정보 가져오기
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        // getUser() 호출 후 세션이나 사용자 정보가 없으면 user를 null로 설정
        if (userError) {
          setUser(null);
          console.log("세션 없음", userError); // 디버깅용
          return;
        }

        const user = userData?.user;
        setUser(user || null); // user가 없으면 null로 설정
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchUserData();
  }, []);

  if (loading)
    return (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    );
  if (error) return <p>{error}</p>;

  return (
    <SidebarContainer>
      {/* Profile Section */}
      <Profile>
        <ProfileImage
          src={user?.user_metadata?.avatar_url || "/default.png"}
          alt="Profile"
        />
        <ProfileName>
          {/* nickname이 없으면 "Guest"로 표시 */}
          {user?.user_metadata?.name || "Guest"}
        </ProfileName>
      </Profile>
      <Menu>
        <MenuItem to="/mybook">나의 책장</MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Profile = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #cccccc;
`;

const ProfileName = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MenuItem = styled(Link)`
  font-size: 18px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: #e0e0e0;
  margin: 5px 0;
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    background-color: #007bff;
    color: white;
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

export default Sidebar;
