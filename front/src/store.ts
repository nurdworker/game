// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { ReduxState } from "./types/index";

//type
type Action = { type: "SET_TEST_DATA"; value: string };

// initial data
const initialState: ReduxState = {
  data: { testData: "testData" },
};

// reducer
const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    // set data
    case "SET_TEST_DATA":
      return { ...state, data: { ...state.data, testData: action.value } };

    default:
      return state;
  }
};

export const store = configureStore({
  reducer: appReducer,
});
