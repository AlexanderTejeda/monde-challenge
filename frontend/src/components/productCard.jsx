const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <h3>{product.descripcion}</h3>
      <p className="category">{product.categoria}</p>
      <p className="stock">{product.stock} disponibles</p>
      <p className="rating">⭐⭐⭐⭐⭐ {product.rating}</p>
      <p className="description">{product.description}</p>
      <p className="price">${product.price}</p>
      <button
        onClick={() => onAdd(product)}
        disabled={product.stock <= 0 || !product.status}
        className={product.stock <= 0 ? "disabled-button" : ""}
      >
        {product.stock <= 0 ? "Agotado" : "Agregar al carrito"}
      </button>
    </div>
  );
};

export default ProductCard;