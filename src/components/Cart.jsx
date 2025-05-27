import { useContext } from "react";
import Modal from "./FunctionComponents/Modal";
import CartContext from "./FunctionComponents/CartContext";
import Button from "./FunctionComponents/Button";
import { UserProgressContext } from "./FunctionComponents/UserProgressContext.jsx";


export default function Cart({  }){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price, 
          0
    );

        function handleCloseModal(){
        userProgressCtx.hideCart();
    };

        function showCheckout(){
        userProgressCtx.showCheckout();
        }    


    return(
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
                <ul>
                {cartCtx.items.map((item) => (
                    <li key={item.id} className="cart-item">
                        <p>
                            {item.name} - {item.quantity} * {item.price}
                        </p>
                        <p className="cart-item-actions">
                            <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => cartCtx.addItem(item)}>+</button>
                        </p>
                    </li>
                ))}     
                </ul>
            <p className="cart-total">{cartTotal} $</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseModal}>Close</Button>
                {cartCtx.items.length > 0 ? 
                  <Button onClick={showCheckout}>Go to Checkout</Button> : null
                }
            </p>
        </Modal>
    );
}

 