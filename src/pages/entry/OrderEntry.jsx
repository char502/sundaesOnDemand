// import GrandTotal from './GrandTotal';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  // console.log(orderDetails);

  return (
    <div>
      <h1>Design Your Sundae</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <div style={{ marginTop: '30px' }}>
        <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
        <button onClick={() => setOrderPhase('review')}>Order Sundae</button>
      </div>
    </div>
  );
}

export default OrderEntry;
