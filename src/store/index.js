import { configureStore, createSlice } from "@reduxjs/toolkit";


const initialCounterState = { counter: 0, showCase: true };

const counterSlice = createSlice({
    name: 'Test',
    initialState: initialCounterState, 
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




const initialAuthState = { loggedIn: false };

const authSlice = createSlice({
    name: 'Auth',
    initialState: initialAuthState,
    reducers: {
        Login(state){
            state.loggedIn = true;
        },
        Logout(state){
            state.loggedIn = false;
        }
    }
});

const store = configureStore({
    reducer: { counter: counterSlice.reducer, auth: authSlice.reducer}
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;