// import GrandTotal from './GrandTotal';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

function OrderEntry() {
  const [orderDetails] = useOrderDetails();

  // console.log(orderDetails.totals.grandTotal);

  return (
    <div>
      <h1>Design Your Sundae</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <div style={{ margin: '30px' }}>
        <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      </div>
    </div>
  );
}

export default OrderEntry;
