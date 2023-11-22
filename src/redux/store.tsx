import { configureStore } from "@reduxjs/toolkit"
import { uselessSlice } from "./states/uselessState"

export interface AppStore {
    useless: string
}

const store = configureStore<AppStore>({
    reducer: {
        useless: uselessSlice.reducer
    }
})

export default store