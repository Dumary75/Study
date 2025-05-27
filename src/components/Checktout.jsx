import { useContext } from "react"
import CartContext from "./FunctionComponents/CartContext"
import Modal from "./FunctionComponents/Modal";
import Input from "./FunctionComponents/Input";
import Button from './FunctionComponents/Button';
import { UserProgressContext } from "./FunctionComponents/UserProgressContext";


export default function Checkout(){

const cartCtx = useContext(CartContext);
const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price, 
        0
    );

        function handleCloseModal(){
        userProgressCtx.hideCart();
    };

    return <Modal open={userProgressCtx.progress === 'checkout'}>
        <form>
            <h2>Checkout</h2>
            <p>Total Amount: {cartTotal} $</p>

            <Input label='Full Name' type='text' id='full-name'/>
            <Input label='E-Mail Adress' type='email' id='email'/>
            <Input label='Street' type='text' id='street'/>
            <div className="control-row">
                <Input label='Postal Code' type='text' id='postal-code'/>
                <Input label='City' type='text' id='city'/>
            </div>

            <p className="modal-actions">
                <Button textOnly type='button' onClick={handleCloseModal}>Close</Button>
                <Button textOnly type='button' onClick={handleCloseModal}>Submit Order</Button>
            </p>
        </form>
    </Modal>
}
