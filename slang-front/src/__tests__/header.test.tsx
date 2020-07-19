import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Header from 'sections/header/header';

Enzyme.configure({ adapter: new Adapter() });

const words = [
  'mesas',
  'routinisms',
  'laveering',
  'whimper',
  'frankly',
  'guffawing',
  'salience',
  'underclassmen',
  'rejoinders',
  'overspeculates',
];

describe('<Middle />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    window.HTMLMediaElement.prototype.load = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
    wrapper = mount(<Header />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should fill the bar width according to the count of words', () => {
    /*
    STEPS TO TEST

    1 - Get the bar element
    2 - Get the counting of words available, and received from backend
    3 - Set current word to be 5 
    4 - Expect the width to be in 50%
    */
  });
});
