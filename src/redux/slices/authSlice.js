import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action) => {
            state.user = action.payload;
        },
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        logout: (state)=> {
            state.user = null;
            state.loading = false;
        },
    },
});

export const {setUser, setLoading, logout} = authSlice.actions;
export default authSlice.reducer;