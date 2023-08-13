import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login, fetchProfile } from "../services/ApiCalls";

export const loginPost = createAsyncThunk("SignIn/PostLogin", async (data) => {
  const { email, pwd } = data;
  return Login(email, pwd);
});

export const fetchProfilePost = createAsyncThunk(
  "SignIn/fetchProfile",
  async (token) => {
    return fetchProfile(token);
  }
);

export const SignInSlice = createSlice({
  name: "SignIn",
  initialState: {
    data: { body: { token: null }, user: { firstName: null, lastName: null } },
    loading: "idle",
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginPost.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(loginPost.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        if (!action.payload) {
          return {
            ...state,
            isLoggedIn: false,
            loading: "idle",
            error: "",
          };
        }
        return {
          ...state,
          data: action.payload,
          isLoggedIn: true,
          loading: "idle",
          error: "",
        };
      }
    });
    builder.addCase(loginPost.rejected, (state, action) => {
      if (state.loading === "pending") {
        return {
          ...state,
          loading: "idle",
          isLoggedIn: false,
          error: "Error occured",
        };
      }
    });
    builder.addCase(fetchProfilePost.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(fetchProfilePost.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        return {
          ...state,
          loading: "idle",
          data: {
            ...state.data,
            user: action.payload.data.body,
          },
        };
      }
    });
    builder.addCase(fetchProfilePost.rejected, (state, action) => {
      if (state.loading === "pending") {
        return {
          ...state,
          loading: "idle",
          error: "Error Occured",
        };
      }
    });
  },
});

const { actions, reducer } = SignInSlice;
export const { logout } = actions;
export default reducer;
