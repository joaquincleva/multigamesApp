import { configureStore } from "@reduxjs/toolkit";
import { uselessSlice } from "./states/uselessState";
import { RoscoScore, roscoSlice } from "./states/roscoReduxState";
import { MechanographyScore, mechanographySlice } from "./states/mechanographyState";

export interface AppStore {
  useless: string;
  roscoReduxState: RoscoScore;
  mechanography: MechanographyScore
}

const store = configureStore<AppStore>({
  reducer: {
    useless: uselessSlice.reducer,
    roscoReduxState: roscoSlice.reducer,
    mechanography: mechanographySlice.reducer
  },
});

export default store;
