import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import App from './App';
import Form from './components/Form';
import ParkingMap from './components/ParkingMap';
import LandingPage from './components/LandingPage';
import { findButton, mockResp } from './setupTests';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

const mockResponse = data =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(data) });

const mockFetch = () => {
  return mockResponse(mockResp);
};

describe('App rendering tests', () => {
  let app;
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterAll(() => {
    global.fetch.mockClear();
  });

  beforeEach(async () => {
    app = mount(<App />);
    await act(async () => await flushPromises());
    app.update();
  });

  describe('App component initial content', () => {
    test('Contains a form component', () => {
      expect(app.exists(Form)).toBeTruthy();
    });

    test('Displays landing page', () => {
      expect(app.exists(LandingPage)).toBeTruthy();
    });

    test('Does not display parking map at startup', () => {
      expect(app.exists(ParkingMap)).toBeFalsy();
    });

    test("There should be a 'Search' button", () => {
      const searchButton = findButton(app, /Search/i);
      expect(searchButton.exists()).toBe(true);
    });
  });

  describe('PropTypes', () => {
    test('Form has PropTypes defined', () => {
      expect(Form).toHaveProperty('propTypes');
    });
    test('ParkingMap has PropTypes defined', () => {
      expect(ParkingMap).toHaveProperty('propTypes');
    });
  });
});

describe('App test', () => {
  let app;
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    app = mount(<App />);
  });

  afterAll(() => {
    global.fetch.mockClear();
  });

  test('Smoke test', async () => {
    await act(async () => await flushPromises());
    app.update();
  });
});

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
