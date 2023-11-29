import { configureStore } from "@reduxjs/toolkit";
import { uselessSlice } from "./states/uselessState";
import { RoscoScore, roscoSlice } from "./states/roscoReduxState";
import { MechanographyScore, mechanographySlice } from "./states/mechanographyState";
import { MathGameScore, mathGameSlice } from "./states/mathGameState";

export interface AppStore {
  useless: string;
  roscoReduxState: RoscoScore;
  mechanography: MechanographyScore
  mathGame: MathGameScore
}

const store = configureStore<AppStore>({
  reducer: {
    useless: uselessSlice.reducer,
    roscoReduxState: roscoSlice.reducer,
    mechanography: mechanographySlice.reducer,
    mathGame: mathGameSlice.reducer
  },
});

export default store;
