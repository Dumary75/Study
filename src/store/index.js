import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCase: true };


const counterSlice = createSlice({
    name: 'Test',
    initialState, 
    reducers: {
        Increment(state) {
            state.counter++;
        },
        Decrement(state) {
            state.counter--;
        },
        Increase(state, action) {
            state.counter += action.payload;
        },
        Toggle(state) {
            state.showCase = !state.showCase;
        },
    },
});



const store = configureStore({
    reducer: counterSlice.reducer
});

export const counterActions = counterSlice.actions;

export default store;