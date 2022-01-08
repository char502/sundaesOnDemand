import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then(response => setOrderNumber(response.data.orderNumber))
      .catch(error => setError(true));
  }, [error]);

  const handleConfirmOrder = () => {
    setOrderPhase('inProgress');
  };

  return (
    <div>
      <h2>Thank you!</h2>

      <h3>Your order number is: {orderNumber}</h3>

      <h5>As per our terms and conditions, nothing will happen now</h5>
      <button onClick={handleConfirmOrder}>Create New Order</button>
    </div>
  );
}

export default OrderConfirmation;
