import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('initial conditions', () => {
  render(<SummaryForm />);

  const confirmButton = screen.getByRole('button', {
    name: 'Confirm order',
  });

  const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
    name: 'I Agree to the Terms and Conditions',
  });

  expect(termsAndConditionsCheckbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test('Checkbox enables button on first click and disables on second click', () => {
  render(<SummaryForm />);

  const confirmButton = screen.getByRole('button', {
    name: 'Confirm order',
  });

  const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
    name: 'I Agree to the Terms and Conditions',
  });

  userEvent.click(termsAndConditionsCheckbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(termsAndConditionsCheckbox);
  expect(confirmButton).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /No ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termAndConditionsCheckboxLabel =
    screen.getByText(/terms and conditions/i);

  userEvent.hover(termAndConditionsCheckboxLabel);

  const popover = screen.getByText(/no Ice Cream will actually be delivered/i);
  //   const popover = screen.getByRole('tooltip');
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termAndConditionsCheckboxLabel);

  // disappearance of popover was happening asynchronously, so need
  // an await to catch what is happening before the test finishes
  // otherwise this happens AFTER the test finishes and an error is
  // thrown hence failing the test
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no Ice Cream will actually be delivered/i)
  );
  // expect(nullPopoverAgain).not.toBeInTheDocument();
});
