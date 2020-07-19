import { render, RenderResult, waitFor } from '@testing-library/react';
import App from 'App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

const wrods = [
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

describe('<App />', () => {
  let wrapper: RenderResult<typeof import('/Users/israelsaraiva/dev/challenge/slang-front/node_modules/@testing-library/dom/types/queries')>;

  beforeEach(() => {
    const mock = new MockAdapter(axios);
    const data = {
      data: wrods,
    };

    mock.onGet('http://localhost:3000/actions').reply(200, data);

    window.HTMLMediaElement.prototype.load = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
    wrapper = render(<App />);
  });

  it('should fetch and display data', async () => {
    const { debug } = wrapper;
    const result = await waitFor(() => {
      console.log(debug());
    });

    console.log(result);

    // const countSpan = await waitForElement(() => wrapper.find('#fillbox_10'));

    // const firstInput = wrapper.find('#fillbox_10');
    // const focusedElement = document.activeElement;

    // expect(firstInput.matchesElement(focusedElement)).toEqual(true);
  });

  //   it('should disable weather timer if there is not selected microzone', () => {
  //     const store = mockStore({
  //       userReducer: { user: undefined },
  //       microzonesReducer: {
  //         microzones: [{ name: 'bogota' }],
  //         selectedMicrozones: [],
  //         updatingZones: false,
  //       },
  //     });

  //     const wrapper = mount(
  //       <Provider store={store}>
  //         <Eventualities valuesChanged={() => {}} shouldRefresh={false} />
  //       </Provider>
  //     );

  //     const weatherInput = wrapper.find('input').find('#weather-timer');
  //     expect(weatherInput.is('[disabled]')).toBe(true);

  //     const eventInput = wrapper.find('input').find('#event-timer');
  //     expect(eventInput.is('[disabled]')).toBe(true);
  //   });

  //   it('should present error for invalid inputs', () => {
  //     const weatherInput = wrapper.find('input').find('#weather-timer');

  //     const weatherErrorText =
  //       'The Weather Timer should be in the range (5,120) min.';

  //     weatherInput.simulate('change', { target: { value: '3' } });
  //     const weatherHelper = wrapper.find('p').find('#weather-timer-helper-text');

  //     expect(weatherHelper.text()).toEqual(weatherErrorText);
  //   });

  //   it('should change weather/event on select', () => {
  //     const weatherSelector = wrapper
  //       .find('[data-testid="weather-selector"]')
  //       .find('input');

  //     weatherSelector.simulate('change', { target: { value: 'Light day' } });

  //     // console.log(wrapper.instance());

  //     // expect(wrapper.instance().state.count).toBe(0);

  //     // console.log(weatherSelector.text());
  //     // expect(setRaining).toHaveBeenCalledWith('Light day');
  //   });
});
