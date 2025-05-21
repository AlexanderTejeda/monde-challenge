import { useState } from "react";
import api from "../services/axios";
import SuccessModal from "../components/succesModal";

const Checkout = ({ cart, setCart }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    if (!emailRegex.test(user.email)) {
      setError("Por favor ingresa un correo válido.");
      return;
    }

    try {
      const response = await api.post("/orders", { user, cart });
      if (response.status !== 201) {
        setError("Error al procesar la orden.");
        return;
      }
      setShowModal(true);
      setCart([]);
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.response?.data?.error;
      setError(backendMessage || "Error al procesar la orden.");
    }

  };

  const handleDecrease = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updatedCart);
  };

  const handleIncrease = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCart(updatedCart);
  };

  return (
    <div className="checkout">
      <h2 className="text-2xl font-bold mb-4 text-white">Finaliza tu compra</h2>

      {cart.length === 0 ? (
        <p className="text-gray-400">Tu carrito está vacío.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="price">${item.price} × {item.quantity}</span>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleDecrease(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item.id)}>+</button>
              </div>
              <p className="price">${item.price * item.quantity}</p>
            </div>
          ))}

          <div className="cart-total">
            Total: $
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={user.name}
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={user.email}
          required
          className={isEmailValid ? "" : "invalid-input"}
          onChange={(e) => {
            const value = e.target.value;
            setUser({ ...user, email: value });
            setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
          }}
        />
        <button type="submit">Confirmar pedido</button>
      </form>

      {error && (
        <div className="error-box">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Checkout;
