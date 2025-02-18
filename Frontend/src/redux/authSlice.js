import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Signup user
export const signupUser = createAsyncThunk("auth/signupUser", async (userData, { rejectWithValue }) => {
    
    try {
        const response = await axios.post("http://localhost:8000/api/v1/auth/register", userData);
        console.log(response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Login user
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/auth/login", userData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        role: localStorage.getItem("role") || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            state.user = null;
            state.role = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.role = action.payload.role;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
