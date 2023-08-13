import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "./features/SignIn";
import UpdateProfileReducer from "./features/UpdateProfile";

export default configureStore({
  reducer: {
    SignIn: SignInReducer,
    Update: UpdateProfileReducer,
  },
});
