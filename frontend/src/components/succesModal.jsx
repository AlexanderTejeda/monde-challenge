const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>✅ ¡Gracias por tu compra!</h2>
        <p>Tu orden ha sido registrada exitosamente.</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default SuccessModal;
