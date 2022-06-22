import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    username: "",
    email: "",
    password: "",
    address: ""
  }
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeProfile: (state, action) => {
      const [username, email, password, address] = action.payload;
      state.profile.username = username;
      state.profile.email = email;
      state.profile.password = password;
      state.profile.address = address;
    }
  }
});

export const { changeProfile } = profileSlice.actions;
export default profileSlice.reducer;
