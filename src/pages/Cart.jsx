import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity, 
  removeSelectedItems, purchaseSelectedItems } from '../Features/cart/cartSlice';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Modal from '../components/UI/Modal';
import AOS from "aos"; 
import "aos/dist/aos.css"; 

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseItems, setPurchaseItems] = useState([]);

  const handleBackClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [location]);

  useEffect(() => {
    const newSelectedItems = cartItems
      .filter((item) => item.quantity > 0 && !selectedItems.includes(item.id))
      .map((item) => item.id);
    setSelectedItems((prevSelected) => [...prevSelected, ...newSelectedItems]);
  }, [cartItems]);

  const handleIncrement = (id, stock) => {
    const item = cartItems.find((item) => item.id === id);
    if (item.quantity < stock) {
      dispatch(incrementQuantity({ id, stock }));
      if (!selectedItems.includes(id)) {
        setSelectedItems((prevSelected) => [...prevSelected, id]);
      }
    }
  };

  const handleDecrement = (id, quantity) => {
    quantity > 1 ? dispatch(decrementQuantity(id)): (dispatch(removeFromCart(id)),
    setSelectedItems((prevSelected) => prevSelected.filter((item) => item !== id)));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setSelectedItems([]);
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handlePurchaseSelected = () => {
    if (selectedItems.length > 0) {
      const itemsToPurchase = cartItems.filter((item) =>
        selectedItems.includes(item.id)
      );
      setPurchaseItems(itemsToPurchase);
      setIsModalOpen(true);
    } else {
      alert(t('cartEmpty'));
    }
  };

  const handleConfirmPurchase = () => {
    dispatch(purchaseSelectedItems(selectedItems));
    setSelectedItems([]);
    setIsModalOpen(false);
  };

  const handleRemoveSelected = () => {
    selectedItems.length > 0
      ? (dispatch(removeSelectedItems(selectedItems)), setSelectedItems([]))
      : alert(t('noSelectedItems'));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const selectedTotalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <section className="cart__page">
      <div className="container">
        <button className="back__button" onClick={handleBackClick}>
          <FaArrowLeft /> {t('back')}
        </button>
        <h1>{t('cart')}</h1>
        {cartItems.length === 0 ? (
          <p>{t('cartEmpty')}</p>
        ) : (
          <div className="cart-flex">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item" data-aos="fade-up">
                <div className="cart-item-image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>{t('price')}: ${item.price}</p>
                  <p>
                    {item.stock} - {t('stock')}
                  </p>
                  <div className="cart-item-quantity">
                    <button className="counter-btn bg" onClick={() => handleDecrement(item.id, item.quantity)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="counter-btn bg" onClick={() => handleIncrement(item.id, item.stock)} disabled={item.quantity >= item.stock}>
                      +
                    </button>
                  </div>
                  <div className="cart-item-select">
                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} disabled={item.quantity === 0} />
                    <label>{t('select')}</label>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h2>{t('total')}: ${totalPrice.toFixed(2)}</h2>
              <h3>{t('selectedTotal')}: ${selectedTotalPrice.toFixed(2)}</h3>
              <button onClick={handleClearCart}>{t('clear')}</button>
              <button onClick={handleRemoveSelected}>{t('removeSelected')}</button>
              <button onClick={handlePurchaseSelected}>{t('purchaseSelected')}</button>
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmPurchase} items={purchaseItems} />
    </section>
  );
};

export default Cart;
