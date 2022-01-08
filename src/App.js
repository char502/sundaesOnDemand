// import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import OrderEntry from '../src/pages/entry/OrderEntry';
// import SummaryForm from '../src/pages/summary/SummaryForm';
import OrderSummary from '../src/pages/summary/OrderSummary';
import OrderConfirmation from '../src/pages/confirmation/OrderConfirmation';

import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry;

  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'complete':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <Component setOrderPhase={setOrderPhase} />
        {/* <OrderSummary /> */}
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  );
}

export default App;
