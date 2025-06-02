import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/index.js';

const Counter = () => {
const dispatch = useDispatch();
const counter = useSelector((state) => state.counter.counter);
const showCase = useSelector((state) => state.counter.showCase);


const decrementHandler = () => {
  dispatch(counterActions.Decrement());
}

const incrementHandler = () => {
  dispatch(counterActions.Increment());
}

const increaseHandler = () => {
  dispatch(counterActions.Increase(10));
}

const toggleHandler = () => {
  dispatch(counterActions.Toggle());
}

  return (
    <main className={classes.counter}>
            <h1>Redux Counter</h1>
      {showCase && <div className={classes.value}>{counter}</div>}
        <div>
          <button onClick={incrementHandler}>Increment</button>
          <button onClick={decrementHandler}>Decrement</button>
          <button onClick={increaseHandler}>Increase 5</button>
        </div>
    <button onClick={toggleHandler}>Toggle Counter</button> 
    </main>
  );
};

export default Counter;
