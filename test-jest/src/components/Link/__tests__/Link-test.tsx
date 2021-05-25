import React from 'react';
import { create, act, ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer';
import Link from '../index';

test("Link changes the class when hovered", () => {
  let component: ReactTestRenderer | undefined;

  act(() => {
    component = create(<Link page="https://www.baidu.com/">百度</Link>);
  });

  expect(component?.toJSON()).toMatchSnapshot();

  // manually trigger the callback
  act(() => {
    (component?.toJSON() as ReactTestRendererJSON).props.onMouseEnter();
  });
  // re-rendering
  expect(component?.toJSON()).toMatchSnapshot();

  // manually trigger the callback
  act(() => {
    (component?.toJSON() as ReactTestRendererJSON).props.onMouseLeave();
  });
  // re-rendering
  expect(component?.toJSON()).toMatchSnapshot();
});