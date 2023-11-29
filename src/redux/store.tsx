import { configureStore } from "@reduxjs/toolkit";
import { uselessSlice } from "./states/uselessState";
import { RoscoScore, roscoSlice } from "./states/roscoReduxState";
import {
  MechanographyScore,
  mechanographySlice,
} from "./states/mechanographyState";
import { MathGameScore, mathGameSlice } from "./states/mathGameState";
import { FourChoicesScore, fourChoicesSlice } from "./states/fourChoicesState";

export interface AppStore {
  useless: string;
  roscoReduxState: RoscoScore;
  mechanography: MechanographyScore;
  mathGame: MathGameScore;
  fourChoices: FourChoicesScore;
}

const store = configureStore<AppStore>({
  reducer: {
    useless: uselessSlice.reducer,
    roscoReduxState: roscoSlice.reducer,
    mechanography: mechanographySlice.reducer,
    mathGame: mathGameSlice.reducer,
    fourChoices: fourChoicesSlice.reducer,
  },
});

export default store;
