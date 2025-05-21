import { useState } from "react";
import { FaStore, FaShoppingCart } from "react-icons/fa";

import Home from "./pages/home";
import Checkout from "./pages/checkout";
import Loader from "./components/loader";

import "./styles/index.css";


function App() {
  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {loading ? (
        <Loader onFinish={() => setLoading(false)} />
      ) : (
        <div className="app">
          <nav className="navbar">
            <h1 className="logo">MONDE STORE</h1>
            <div className="nav-links">

              <button
                onClick={() => setView("home")}
                className={`nav-button ${view === "home" ? "active" : ""}`}
              >
                <FaStore className="icon" />
                <span>Productos</span>
              </button>

              <button
                onClick={() => setView("checkout")}
                className={`nav-butt  on ${view === "checkout" ? "active" : ""}`}
              >
                <FaShoppingCart className="icon" />
                <span>Carrito</span>
                {totalItems > 0 && <span className="badge">{totalItems}</span>}
              </button>

            </div>
          </nav>
          <main className="main-content">
            {view === "home" ? (
              <Home cart={cart} setCart={setCart} />
            ) : (
              <Checkout cart={cart} setCart={setCart} />
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default App;