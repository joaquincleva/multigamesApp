import { createSlice } from "@reduxjs/toolkit";

interface mathGameResult {
  date: Date | string;
  score: number;
}

export interface MathGameScore {
  min: number;
  max: number;
  results: mathGameResult[];
}

const mathGameReduxState: MathGameScore = {
  min: 0,
  max: 0,
  results: [] as mathGameResult[],
};

export const mathGameSlice = createSlice({
  name: "mathGameReduxState",
  initialState: mathGameReduxState,
  reducers: {
    setMathGameStats: (_, action: { payload: any }) => action.payload,
    setMathGameScore: (state, action: { payload: number }) => {
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
      mathGameReduxState,
  },
});

export const { setMathGameScore, deleteState, setMathGameStats } =
  mathGameSlice.actions;
export default mathGameSlice.reducer;
