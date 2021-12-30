import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

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

  fireEvent.click(termsAndConditionsCheckbox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(termsAndConditionsCheckbox);
  expect(confirmButton).toBeDisabled();
});
