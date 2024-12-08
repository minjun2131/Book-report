import { supabase } from "./supabase";

export const signUp = async (email, password, metadata = {}) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (authError) {
      throw new Error(authError.message);
    }

    const { error: usersError } = await supabase.from("users").insert([
      {
        id: user.id,
        name: metadata.name || "defaultNickname",
      },
    ]);

    if (usersError) {
      throw new Error(usersError.message);
    }
  } catch (err) {
    console.error("회원가입 에러:", err.message);
    throw err;
  }
};

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("로그인 에러:", err.message);
    throw err;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    console.log("로그아웃 되었습니다.");
  } catch (err) {
    console.error("로그아웃 에러:", err.message);
    throw err;
  }
};
