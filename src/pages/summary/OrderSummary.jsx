import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';

function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Order Summary</h2>
      <div style={{ padding: '20px' }}>
        <h3>Scoops Value: {orderDetails.totals.scoops}</h3>
        <div>Scoop Choice 1</div>
      </div>
      <div style={{ padding: '20px' }}>
        <h3>Toppings Value: {orderDetails.totals.toppings}</h3>
        <div>Scoop Choice 2</div>
      </div>
      <div style={{ padding: '20px' }}>
        <h3>Total: {orderDetails.totals.grandTotal}</h3>
      </div>

      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

export default OrderSummary;
