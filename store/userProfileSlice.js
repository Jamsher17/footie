import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "Profile",
  initialState: {
    profile: {
      fullName: "",
      nickname: "",
      position: "",
      age: "",
      image: null,
    },
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateFullName: (state, action) => {
      state.profile.fullName = action.payload;
    },
    updateNickname: (state, action) => {
      state.profile = { ...state.profile, nickname: action.payload };
    },
    updatePosition: (state, action) => {
      state.position = action.payload;
    },
    updateAge: (state, action) => {
      state.profile.age = action.payload;
    },
    updateImage: (state, action) => {
      state.profile.image = action.payload;
    },
  },
});

export const {
  setProfile,
  updateFullName,
  updateNickname,
  updatePosition,
  updateAge,
  updateImage,
} = userProfileSlice.actions;
export default userProfileSlice.reducer;
