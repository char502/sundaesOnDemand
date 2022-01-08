import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  // render app
  render(<App />);

  //   screen.debug();

  // ================================
  //add ice cream scoops and toppings
  // ================================

  //   const scoopsSubtotal = screen.getByText('Scoops total: £', { exact: false });

  //   expect(scoopsSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  //   expect(scoopsSubtotal).toHaveTextContent('2.00');

  // ========================================================

  const MandMsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });

  userEvent.click(MandMsCheckbox);
  expect(MandMsCheckbox).toBeChecked();

  // =======================================================
  // find and click the 'order' button on the order entry page
  // =======================================================

  const orderSundaeButton = screen.getByRole('button', {
    name: 'Order Sundae',
  });

  console.log(orderSundaeButton);

  userEvent.click(orderSundaeButton);

  // =======================================================
  // check summary information based on order
  // =======================================================

  const scoopsValue = screen.getByRole('heading', { name: /Scoops Value:/ });
  expect(scoopsValue).toHaveTextContent('2.00');

  const toppingsValue = screen.getByRole('heading', {
    name: /Toppings Value:/,
  });
  expect(toppingsValue).toHaveTextContent('1.50');

  const totalValue = screen.getByRole('heading', { name: /Total:/ });
  expect(totalValue).toHaveTextContent('3.50');

  // =======================================================
  // accept terms and conditions and click button to confirm order
  // =======================================================

  const confirmOrderButton = screen.getByRole('button', {
    name: 'Confirm order',
  });

  const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
    name: 'I Agree to the Terms and Conditions',
  });

  userEvent.click(termsAndConditionsCheckbox);

  expect(termsAndConditionsCheckbox).toBeChecked();
  expect(confirmOrderButton).toBeEnabled();

  userEvent.click(confirmOrderButton);

  // =======================================================
  // confirm order number on confirmation page
  // =======================================================

  // click "new order" button on confirmation page

  // check that scoops and toppings subtotals have been reset

  // do we need to await anything to avoid test errors
});
