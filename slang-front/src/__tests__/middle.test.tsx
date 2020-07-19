import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import MiddleSection from 'sections/middle/middle';

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
    wrapper = mount(
      <MiddleSection loadingAudio={false} loadingWords={false} words={words} />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match the number of letters of a word with the number of spaces to fill', () => {
    const answerGroup = wrapper.find('[data-testid="answer_box"]');
    const firstWord = words[0];

    expect(answerGroup).toHaveLength(firstWord.length);
  });
});
