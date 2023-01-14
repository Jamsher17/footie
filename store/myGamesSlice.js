import { createSlice } from "@reduxjs/toolkit";

const myGamesSlice = createSlice({
  name: "myGames",
  initialState: {
    ids: [],
  },
  reducers: {
    // setMyGames: (state, action) => {
    //   state.ids = action.payload.map((game) => game.id);
    // },
    addToMyGames: (state, action) => {
      state.ids.push(action.payload);
    },
    removeFromMyGames: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload), 1);
    },
  },
});

export const { addToMyGames, removeFromMyGames, setMyGames } =
  myGamesSlice.actions;
export default myGamesSlice.reducer;
