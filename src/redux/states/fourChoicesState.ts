import { createSlice } from "@reduxjs/toolkit";

interface fourChoicesResult {
  date: Date | string;
  score: number;
}

export interface FourChoicesScore {
  min: number;
  max: number;
  results: fourChoicesResult[];
}

const fourChoicesReduxState: FourChoicesScore = {
  min: 0,
  max: 0,
  results: [] as fourChoicesResult[],
};

export const fourChoicesSlice = createSlice({
  name: "fourChoicesReduxState",
  initialState: fourChoicesReduxState,
  reducers: {
    setFourChoicesStats: (_, action: { payload: any }) => action.payload,
    setFourChoicesScore: (state, action: { payload: number }) => {
      const newDate = new Date();
      const newResult = {
        date: newDate,
        score: action.payload,
      };
      if (state.results?.length === 0) {
        state.min = action.payload;
        state.max = action.payload;
      } else if (state.min > action.payload) {
        state.min = action.payload;
      } else if (state.max < action.payload) {
        state.max = action.payload;
      }
      state.results = [...state.results, newResult];
      return state;
    },
    deleteState: (_: unknown, __: { payload: unknown }) =>
      fourChoicesReduxState,
  },
});

export const { setFourChoicesScore, deleteState, setFourChoicesStats } =
  fourChoicesSlice.actions;
export default fourChoicesSlice.reducer;
