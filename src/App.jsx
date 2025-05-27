import Header from './components/Header.jsx';
import Products from './components/Products.jsx';
import { CartContextProvider } from './components/FunctionComponents/CartContext.jsx';
import { UserProgressContextProvider } from './components/FunctionComponents/UserProgressContext.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checktout.jsx';

function App() {

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
          <Header />
          <Products />
          <Cart />
          <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
