import { useEffect, useState } from "react";
import api from "../services/axios";
import ProductCard from "../components/productCard";

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

 const handleAddToCart = (product) => {
  if (!product.status || product.stock <= 0) {
    alert(`El producto "${product.name}" está agotado.`);
    return;
  }

  const updatedCart = [...cart];
  const existing = updatedCart.find(p => p.id === product.id);
  if (existing) {
    if (existing.quantity >= product.stock) {
      alert(`Solo hay ${product.stock} unidades disponibles de "${product.name}".`);
      return;
    }
    existing.quantity += 1;
  } else {
    updatedCart.push({ ...product, quantity: 1 });
  }

  setCart(updatedCart);
};


  return (
    <div>
      <section className="hero">
        <h1>Bienvenido a MondeStore</h1>
        <p>Productos únicos y brillantes.</p>
      </section>
      <section className="products-grid">
        {products.length === 0 ? <p>No hay productos disponibles.</p> :
          products.map(product => <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />)}
      </section>
    </div>
  );
};

export default Home;