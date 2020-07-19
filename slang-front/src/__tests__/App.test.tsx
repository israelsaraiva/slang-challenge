import App from 'App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

const response = {
  data: [
    'gundog',
    'hilarious',
    'photosynthesis',
    'mandibular',
    'resensitizes',
    'berated',
    'ropery',
    'aptness',
    'mameyes',
    'underacting',
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    'content-length': '120',
    'content-type': 'application/json; charset=utf-8',
  },
  config: {
    url: 'actions',
    method: 'get',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    baseURL: 'http://localhost:3000/',
    transformRequest: [null],
    transformResponse: [null],
    timeout: 30000,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
  },
  request: {},
};

/* 
  PROBLEM FOUND

  Give the correct mock response for axios, recieving the words
*/

describe('<App />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const mock = new MockAdapter(axios);

    mock.onGet('http://localhost:3000/actions').reply(200, response);

    window.HTMLMediaElement.prototype.play = (() => {}) as any;
    window.HTMLMediaElement.prototype.load = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
    wrapper = mount(<App />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should enable the 'Check The Answer' button", () => {
    // const answerGroup = wrapper.find('[data-testid="answer_box"]');
    // const checkAnswerBtn = wrapper.find('[data-testid="btnCheckAnswer"]');
    // answerGroup.forEach((box) => {
    //   const input = box.find('input');
    //   input.simulate('change', { target: { value: 'a' } });
    // });
    // wrapper.update();
    // console.log(answerGroup.first().find('input').props().value);
  });

  it('should present a positive feedback', () => {
    //STEPS
    /*
    1 - Get the answer group
    2 - Get the check answerbtn
    3 - Fill the empty blocks with the correct letters for the current word
    4 - Simulate click action on checkAnswerBtn
    5 - Get the check element, the represents correct answer
    6 - Expect this check element to exist 
    */
  });

  it('should present a negative feedback', () => {
    //STEPS
    /*
    1 - Get the answer group
    2 - Get the check answerbtn
    3 - Fill the empty blocks with wrong letters position for the current word
    4 - Simulate click action on checkAnswerBtn
    5 - Get the check element, the represents correct answer
    6 - Expect this check element to exist 
    */
  });
});
