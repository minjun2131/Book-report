import { supabase } from "../api/supabase";

// 기본 이미지 업로드 함수
const uploadDefaultImage = async (userId) => {
  try {
    // 기본 이미지를 fetch로 가져오기 (public 폴더 내 default.png)
    const response = await fetch("/default.png"); // 수정된 경로
    if (!response.ok) {
      throw new Error("기본 이미지 불러오기 실패");
    }

    const blob = await response.blob(); // Blob 형태로 변환

    // 파일 이름을 userId로 고유하게 설정
    const timestamp = Date.now();
    const fileName = `profile_images/${userId}/${timestamp}_default.png`;

    // 파일 업로드
    const { data, error } = await supabase.storage
      .from("profile_image") // 버킷 이름
      .upload(fileName, blob, {
        contentType: "image/png", // 이미지 타입 지정
        upsert: true, // 동일한 파일이 있을 경우 덮어쓰기
      });

    if (error) {
      console.error("이미지 업로드 실패:", error.message);
      return null;
    }

    // 업로드된 파일의 공개 URL 가져오기
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("profile_image")
      .getPublicUrl(fileName);

    if (urlError) {
      console.error("공개 URL 가져오기 실패:", urlError.message);
      return null;
    }

    console.log("기본 프로필 이미지 업로드 성공:", publicUrlData.publicUrl);
    return publicUrlData?.publicUrl;
  } catch (err) {
    console.error("업로드 오류:", err.message);
    return null;
  }
};

export default uploadDefaultImage;
