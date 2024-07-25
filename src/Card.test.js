import {render} from '@testing-library/react';

import Card from './Card';

//smoke test
it('renders Card without crashing', () => {
    render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={2} />);
  });

//snapshot test
it('matches Card snapshot', () => {
    const { asFragment } = render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={2} />);
    expect(asFragment()).toMatchSnapshot();
  });