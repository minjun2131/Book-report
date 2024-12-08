import React, { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading, logout } from "../slices/authSlice";
import { supabase } from "../../api/supabase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          dispatch(logout());
        } else {
          dispatch(setUser(session.user));
        }
        dispatch(setLoading(false));
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, [dispatch]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
