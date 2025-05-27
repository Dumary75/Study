import { useContext } from "react";
import Button from './FunctionComponents/Button.jsx';
import CartContext from "./FunctionComponents/CartContext";
import { UserProgressContext } from "./FunctionComponents/UserProgressContext.jsx";

export default function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowModal(){
        userProgressCtx.showCart();
    }

      return (
          <header id="main-header">
              <div id="title">
                <img src="logo.jpg" alt="Food picture" />
                <h1>ReactFood</h1>
              </div>
              <nav>
                  <Button textOnly onClick={handleShowModal}>Cart ({totalCartItems} )</Button>
              </nav>
          </header>
      );
}