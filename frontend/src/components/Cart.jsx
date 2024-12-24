import React from 'react';
import '../styles/Cart.css';

const Cart = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-container">
      <h2>购物车</h2>
      {items.length === 0 ? (
        <p>购物车是空的</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>¥{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => onRemoveItem(item._id)}>
                    删除
                  </button>
                </div>
                {item.requiresPrescription && (
                  <div className="prescription-upload">
                    <p>需要处方</p>
                    <input type="file" accept="image/*,.pdf" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>总计: ¥{calculateTotal()}</h3>
            <button className="checkout-btn">结算</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 