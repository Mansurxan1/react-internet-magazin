import { useTranslation } from "react-i18next";

const Modal = ({ isOpen, onClose, onConfirm, items }) => {
  if (!isOpen) return null;
  const { t, i18n } = useTranslation();
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{t("purchase")}</h2>
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
            {t("Confirmation")}
          </button>
          <button className="modal-button cancel" onClick={onClose}>
            {t("clear1")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
