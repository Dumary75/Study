import { useContext } from "react";
import Button from './FunctionComponents/Button.jsx';
import CartContext from "./FunctionComponents/CartContext";


export default function Header(){
    const cartCtx = useContext(CartContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

      return (
          <header id="main-header">
              <div id="title">
                <img src="logo.jpg" alt="Food picture" />
                <h1>ReactFood</h1>
              </div>
              <nav>
                  <Button textOnly>Cart ({totalCartItems})</Button>
              </nav>
          </header>
      );
}