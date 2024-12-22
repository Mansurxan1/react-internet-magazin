import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

Modal.setAppElement('#root');

const PurchaseModal = ({ isOpen, onRequestClose, item }) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={t('purchaseConfirmation')}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>{t('purchaseConfirmation')}</h2>
      <button onClick={onRequestClose} className="close-modal">X</button>
      <div>
        {item ? (
          <div>
            <p>{t('purchasedItem')}: {item.title}</p>
            <p>{t('quantity')}: {item.quantity}</p>
          </div>
        ) : (
          <p>{t('cartEmpty')}</p>
        )}
      </div>
    </Modal>
  );
};

export default PurchaseModal;
