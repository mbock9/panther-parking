import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Select from '@material-ui/core/Select';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import App from './App';
import Form from './components/Form';
import ParkingMap from './components/ParkingMap';
import LandingPage from './components/LandingPage';
import {
  parkingLots,
  findButton,
  testCase1,
  testCase2,
  mockResp
} from './setupTests';

const props = {
  userType: testCase1.userType,
  setUser: jest.fn(),
  timeIn: testCase1.timeIn,
  setTimeIn: jest.fn(),
  timeOut: testCase1.timeOut,
  setTimeOut: jest.fn(),
  mobileOpen: testCase1.mobileOpen,
  setMobileOpen: jest.fn(),
  lotSelected: testCase1.lotSelected,
  setLotSelected: jest.fn(),
  landingPage: testCase1.landingPage,
  changeLandingPage: jest.fn()
};

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

const mockResponse = data =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(data) });

const mockFetch = url => {
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

  describe('LandingPage transition tests', () => {
    beforeEach(() => {
      const searchButton = findButton(app, /Search/i);
      expect(searchButton.exists()).toBe(true);
      expect(app.exists(LandingPage)).toBeTruthy();
      expect(app.exists(ParkingMap)).toBeFalsy();
      searchButton.simulate('click');
    });

    test('App transitions back and forth from landing page to parking map', () => {
      expect(app.exists(LandingPage)).toBeFalsy();
      expect(app.exists(ParkingMap)).toBeTruthy();
      const infoButton = findButton(app, /info/i);
      expect(infoButton.exists()).toBe(true);
      infoButton.simulate('click');
      expect(app.exists(LandingPage)).toBeTruthy();
      expect(app.exists(ParkingMap)).toBeFalsy();
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
