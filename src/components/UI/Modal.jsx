const Modal = ({ isOpen, onClose, onConfirm, items }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Xaridni tasdiqlash</h2>
        <div className="modal-items">
          {items.map((item, index) => (
            <div key={index} className="modal-item">
              <span className="item-title">{item.title}</span>
              <span className="item-quantity">{item.quantity}x</span>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="modal-button confirm" onClick={onConfirm}>
            Tasdiqlash
          </button>
          <button className="modal-button cancel" onClick={onClose}>
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
