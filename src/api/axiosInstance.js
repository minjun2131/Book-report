import axios from "axios";

const naverKey = import.meta.env.VITE_NAVER_ID;
const naverSecret = import.meta.env.VITE_NAVER_SECRET;
console.log(naverKey, naverSecret);

const api = axios.create({
  baseURL: "/api/book.json",
  headers: {
    "X-Naver-Client-Id": naverKey,
    "X-Naver-Client-Secret": naverSecret,
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

api.interceptors.request.use(
  function (config) {
    console.log("인터셉트 요청 성공!");
    return config;
  },
  function (error) {
    console.log("인터셉트 요청 오류!");
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  function (response) {
    console.log("응답 받았습니다.");
    return response;
  },
  function (error) {
    console.log("응답 받지 못했습니다.");
    return Promise.reject(error);
  }
);

export default api;
