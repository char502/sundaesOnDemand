import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays image for each scoop option from the server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map(img => img.alt);

  // When working with arrays or objects (any mutable type) use the toEqual() matcher

  // as opposed to numbers or strings which can use the toBe() matcher
  expect(altText).toEqual(['Vanilla scoop', 'Chocolate scoop']);
});

test('displays image for each topping option from the server', async () => {
  render(<Options optionType='toppings' />);

  // find images
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingImages.map(img => img.alt);

  // When working with arrays or objects (any mutable type) use the toEqual() matcher

  // as opposed to numbers or strings which can use the toBe() matcher
  expect(altText).toEqual([
    'M&Ms topping',
    'Hot fudge topping',
    'Peanut butter cups topping',
  ]);
});
