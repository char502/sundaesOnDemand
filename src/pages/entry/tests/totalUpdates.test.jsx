import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  <Options optionType={'scoops'} />;

  // make sure total starts out £0

  // exact: false will find an element even if it can't find the entire string
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  //  WHEN UPDATING A TEXT ELEMENT, better to use clear first as don't know what's been
  //  in it before, where the cursor will start (may end up with a 10 instead of a 1 and test will fail)
  userEvent.clear(vanillaInput);
  // userEvent.type requires a string
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 then check subtotal again
  const chocolateInput = await screen.findByRole('spinButton', {
    name: 'Chocolate',
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  expect(chocolateInput).toHaveTextContent('6.00');
});