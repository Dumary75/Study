import { useState } from 'react';
import Cart from './Cart.jsx';


export default function Header(){
const[modal,Setmodal] = useState(true);

      return (
          <header id="main-header">
              <div id="title">
                <img src="logo.jpg" alt="Food picture" />
                <h1>ReactFood</h1>
              </div>
              <nav>
                  <button><Cart modal={modal} Setmodal={Setmodal} /></button>
              </nav>
          </header>
      );
}