// refs: https://jestjs.io/zh-Hans/docs/snapshot-testing

import React from 'react';
import renderer from 'react-test-renderer';
import Link from '../src/components/Link';

it("renders correctly", () => {
  const tree = renderer.create(<Link page="https://www.qq.com/">腾讯</Link>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://prettier.io">Prettier</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
<a
  className="normal"
  href="https://prettier.io"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Prettier
</a>
`);
});

it('will fail every time', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});