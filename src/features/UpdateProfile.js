import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfile } from "../services/ApiCalls";

export const updateProfilePut = createAsyncThunk(
  "UpdateProfile/Update",
  async (data) => {
    const { firstNameInput, lastNameInput, token } = data;
    return updateProfile(firstNameInput, lastNameInput, token);
  }
);

export const UpdateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    data: { firstName: null, lastName: null, token: null },
    loading: "idle",
    errror: null,
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfilePut.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(updateProfilePut.fulfilled, (state, action) => {
      console.log(action);
      if (state.loading === "pending") {
        console.log(action.payload);
        return {
          ...state,
          data: action.payload.data.body,
          error: "",
        };
      }
    });
    builder.addCase(updateProfilePut.rejected, (state, action) => {
      if (state.loading === "pending") {
        return {
          ...state,
          loading: "idle",
          isLoggedIn: false,
          error: "Error occured",
        };
      }
    });
  },
});

const { actions, reducer } = UpdateProfileSlice;
export const {} = actions;
export default reducer;
