import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

// ui is a standard way to refer to whatever JSX you're trying to render
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
