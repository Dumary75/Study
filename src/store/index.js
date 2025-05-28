import { createStore } from "redux";

const initalState = { counter: 0, showCase: true}

const reducerFunction = (state = initalState, action) => {

        switch (action.type) {
            case 'Increment':
                return{
                    ...state, 
                    counter: state.counter +1, 
                    showCase: state.showCase
                };
                
            case 'Decrement':
                return{
                    ...state, 
                    counter: state.counter -1,
                    showCase: state.showCase
                };

            case 'Increase':
                return{
                    ...state, 
                    counter: state.counter + action.amount,
                    showCase: state.showCase
                };

            case 'Toggle':
                return{
                    showCase: !state.showCase,
                    counter: state.counter
                };

            default:
                return state;
        };
};

const store = createStore(reducerFunction);

export default store;