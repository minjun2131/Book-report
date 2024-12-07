import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../pages/Main";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MyBook from "../pages/MyBook";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mybook" element={<MyBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
