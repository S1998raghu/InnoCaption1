import React from 'react';


const Cart = ({ cart, editCartItem, deleteCartItem }) => {
  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    editCartItem(productId, newQuantity);
  };

 
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <div className="container">
      <h2 className="my-4">Shopping Cart</h2>
      <ul className="list-group">
        {cart.map(item => (
          <li key={item.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span>{item.title}</span>
                <span className="mx-3">${item.price}</span>
              </div>
              <div className="input-group" style={{ width: '150px' }}>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(item.id, event)}
                />
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => deleteCartItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4">Total Price: ${calculateTotalPrice()}</p>
    </div>
  );
};

export default Cart;
