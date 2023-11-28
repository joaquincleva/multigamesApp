import { createSlice } from "@reduxjs/toolkit";

interface roscoResult {
  date: Date | string;
  score: number;
}

export interface RoscoScore {
  min: number;
  max: number;
  results: roscoResult[];
}

const roscoReduxState: RoscoScore = {
  min: 0,
  max: 0,
  results: [] as roscoResult[],
};

export const roscoSlice = createSlice({
  name: "roscoReduxState",
  initialState: roscoReduxState,
  reducers: {
    setRoscoStats: (_,action: {payload: any})=>action.payload,
    setRoscoScore: (state, action: { payload: number }) => {
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
    deleteState: (state: unknown, action: { payload: unknown }) =>
      roscoReduxState,
  },
});

export const { setRoscoScore, deleteState, setRoscoStats } = roscoSlice.actions;
export default roscoSlice.reducer;
