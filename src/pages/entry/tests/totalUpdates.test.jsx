import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  // The wrapper is the context provider used in this app (could also be a redux provider, a router)
  // Anything you want to wrap your component in, in order to access whatever it needs for the tests
  render(<Options optionType={'scoops'} />);

  // make sure total starts out £0.00

  // exact: false will find an element even if it can't find the entire string

  // Subtotal is a display element, does not have a particular ROLE on the page so can
  // Just find it by text
  const scoopsSubtotal = screen.getByText('Scoops total: £', { exact: false });

  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  //  WHEN UPDATING A TEXT ELEMENT, better to use clear first as don't know what's been
  //  in it before, where the cursor will start (may end up with a 10 instead of a 1 and test will fail)
  userEvent.clear(vanillaInput);
  // userEvent.type (typing into the element) requires a string
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 then check subtotal again
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType={'toppings'} />);

  const toppingsSubtotal = screen.getByText('Toppings total: £', {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const MmsCheckbox = await screen.findByRole('checkbox', {
    name: 'M&Ms',
  });

  const HotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });

  userEvent.click(MmsCheckbox);

  expect(MmsCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  userEvent.click(HotFudgeCheckbox);

  expect(HotFudgeCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  userEvent.click(MmsCheckbox);

  expect(MmsCheckbox).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: £/i,
    });

    // check that the grand total starts out at 0
    // can't put it in it's own test as affected by the axios calls
    // easier just to put it here
    expect(grandTotal).toHaveTextContent('0.00');

    // update vanilla scoops and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');

    // add M & M's and check grand total
    const MmsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });

    userEvent.click(MmsCheckbox);

    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const MmsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });

    userEvent.click(MmsCheckbox);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: £/i,
    });

    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const MmsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });

    userEvent.click(MmsCheckbox);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: £/i,
    });

    expect(grandTotal).toHaveTextContent('3.50');

    userEvent.click(MmsCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
