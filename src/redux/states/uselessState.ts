import { createSlice } from "@reduxjs/toolkit";

const uselessState: string = ""

export const uselessSlice = createSlice({
    name: "useless",
    initialState: uselessState,
    reducers: {
        setState: (state: unknown, action: { payload: string }) => action.payload,
        deleteState: (state: unknown, action: {payload: unknown})=>uselessState
    },
});

export const {setState, deleteState} = uselessSlice.actions
export default uselessSlice.reducer