import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays image for each scoop option from the server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map(element => element.alt);

  // When working with arrays or objects (any mutable type) use the toEqual() matcher

  // as opposed to numbers or strings which can use the toBe() matcher
  expect(altText).toEqual(['Vanilla scoop', 'Chocolate scoop']);
});
