import { rest } from 'msw';

// ctx is a utility to build a response from the server

export const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Vanilla',
          imagePath: '/images/vanilla.png',
        },
        {
          name: 'Chocolate',
          imagePath: '/images/chocolate.png',
        },
      ])
    );
  }),
  rest.get('http://localhost:3030/toppings', null),
  rest.post('http://localhost:3030/order', null),
];
