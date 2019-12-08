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
import { parkingLots, findButton } from './setupTests';

const dateProp = new Date();

const testCase1 = {
  userType: 'default',
  timeIn: dateProp,
  timeOut: dateProp,
  mobileOpen: false,
  landing: false,
  lotSelected: 'false'
};

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
  landing: testCase1.landing,
  changeLandingPage: jest.fn()
};

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

const mockResponse = data =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(data) });

const mockFetch = (url, options) => {
  if (options) {
    if (options.method === 'PUT') {
      // we don't store any changes, we just return the same object
      const data = JSON.parse(options.body);
      return mockResponse(data);
    }
  } else {
    return mockResponse(parkingLots);
  }
};

// describe('App shallow rendering tests', () => {
//   let app;
//   beforeEach(() => {
//     app = shallow(<App />);
//   });
//
//   describe('App component initial content', () => {
//     test('Contains a form component', () => {
//       expect(app.contains(Form)).toEqual(true);
//     });
//
//     test('Contains a parking map component', () => {
//       expect(app.contains(ParkingMap)).toEqual(true);
//     });
//   });

describe('App rendering tests', () => {
  let app;

  beforeEach(async () => {
    app = mount(<App />);
    await act(async () => await flushPromises());
    app.update();
  });

  describe('App component initial content', () => {
    test('Contains a form component', () => {
      expect(app).toContainExactlyOneMatchingElement(Form);
    });

    test('Does not display parking map at startup', () => {
      expect(app)
        .containsMatchingElement(ParkingMap)
        .toBeFalsy();
    });

    test("There should be a 'Search' button", () => {
      const button = findButton(app, /Search/i);
      expect(button.exists()).toBe(true);
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

// describe('LandingPage transition tests', () => {
//   let newDate;
//   let mount;
//   beforeEach(() => {
//     newDate = new Date();
//     mount = createMount();
//   });
//
//   afterEach(() => {
//     mount.cleanUp();
//   });
//
//   test('Test that parking map appears after form is submitted on landing page', () => {
//     const comp = mount(<App />);
//     await act(async()=> await flushPromises());
//     comp.update();
//     button = comp.find('button');
//     expect(comp.find('ParkingMap')).toBeFalsy();
//     button.simulate('click');
//     expect(comp.find('ParkingMap')).toBeTruthy();
//   });
// });

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
  //
  // test('Test that parking map appears after form is submitted on landing page', async () => {
  //   await act(async () => await flushPromises());
  //   app.update();
  //   const button = findButton(app, /Search/i);
  //   expect(app.find('ParkingMap')).toBeFalsy();
  //   button.simulate('click');
  //   expect(app.find('ParkingMap')).toBeTruthy();
  // });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
