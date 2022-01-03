import { render, screen, waitFor } from '@testing-library/react';

import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

// set up Mock Service worker to return errors for the scoops and toppings routes

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  // need waitFor to correct a failing test
  // findAllByRole was only returning the first 'get', not waiting for the second
  // then moving to 'expect(alerts).toHaveLength(2)'
  // This was was then failing (as the test expected 2 items and was only getting 1)
  // waitFor solves this problem
  // Also had to remove 'name' as second argument from role

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});
