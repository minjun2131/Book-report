import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../pages/Main";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MyBook from "../pages/MyBook";
import { Provider } from "react-redux";
import store from "../redux/config/store";
import { AuthProvider } from "../redux/modules/AuthContext.jsx";

function Router() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/mybook"
            element={
              <AuthProvider>
                <MyBook />
              </AuthProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default Router;
