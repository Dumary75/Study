import Cart from './components/Cart.jsx';
import Products from './components/Products.jsx';

function App() {
  return (
    <main>
      <header id="main-header">
        <div id="title">
          <img src="logo.jpg" alt="Food picture" />
          <h1>ReactFood</h1>
        </div>
        <Cart />
      </header>
      <Products />
    </main>
  );
}

export default App;
