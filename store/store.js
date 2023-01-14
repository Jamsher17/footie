import { configureStore } from "@reduxjs/toolkit";
import myGamesReducer from "./myGamesSlice";
import userProfileReducer from "./userProfileSlice";

export const store = configureStore({
  reducer: {
    myGames: myGamesReducer,
    userProfile: userProfileReducer,
  },
});
