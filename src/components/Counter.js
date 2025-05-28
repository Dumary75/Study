import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
const counter = useSelector(state => state.counter);
const showCase = useSelector(state => state.showCase);
const dispatch = useDispatch();

const decrementHandler = () => {
  dispatch({ type: 'Decrement'})
}

const incrementHandler = () => {
  dispatch({ type: 'Increment'})
}

const increaseHandler = () => {
  dispatch({ type: 'Increase', amount: 5})
}

const toggleHandler = () => {
  dispatch({ type: 'Toggle'})
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
