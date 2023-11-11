import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const Reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    updateTodos: (state, { payload }) => {
      state.todos = payload;
    },
    restDat: (state, { payload }) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTodos } = Reducer.actions;

export default Reducer.reducer;
