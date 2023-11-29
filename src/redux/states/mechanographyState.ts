import { createSlice } from "@reduxjs/toolkit";

interface mechanographyResult {
  date: Date | string;
  score: number;
}

export interface MechanographyScore {
  min: number;
  max: number;
  results: mechanographyResult[];
}

const mechanographyReduxState: MechanographyScore = {
  min: 0,
  max: 0,
  results: [] as mechanographyResult[],
};

export const mechanographySlice = createSlice({
  name: "mechanographyReduxState",
  initialState: mechanographyReduxState,
  reducers: {
    setMechanographyStats: (_,action: {payload: any})=>action.payload,
    setMechanographyScore: (state, action: { payload: number }) => {
      const newResult = {
        date: new Date(),
        score: action.payload,
      };
      if (state.results.length === 0) {
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
      mechanographyReduxState,
  },
});

export const { setMechanographyStats, setMechanographyScore, deleteState } = mechanographySlice.actions;
export default mechanographySlice.reducer;
