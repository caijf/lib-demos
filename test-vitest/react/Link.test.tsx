import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Link from './Link.jsx';

test('Link changes the state when hovered', async () => {
  render(<Link page="http://antfu.me">Anthony Fu</Link>);

  const link = screen.getByText('Anthony Fu');

  expect(link).toHaveAccessibleName('Link is normal');

  await userEvent.hover(link);

  expect(link).toHaveAccessibleName('Link is hovered');

  await userEvent.unhover(link);

  expect(link).toHaveAccessibleName('Link is normal');
});

test('renders correctly', async () => {
  const result = render(<Link page="http://baidu.com">some text</Link>);
  const link = result.getByText('some text');

  expect(link).toMatchSnapshot();

  await userEvent.hover(link);
  expect(link).toMatchSnapshot();
});
