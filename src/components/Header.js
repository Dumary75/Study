import classes from './Header.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index.js';

const Header = () => {
const dispatch = useDispatch();

const LogoutHandler = () => {
  dispatch(authActions.Logout());
}

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={LogoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
