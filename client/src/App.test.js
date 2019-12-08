import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Select from '@material-ui/core/Select';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import App from './App';
import Form from './components/Form';
import ParkingMap from './components/ParkingMap';

const parkingLots = [
  {
    type: 'Feature',
    properties: {
      lot_type: 'U',
      name: 'Fitness Center',
      description:
        'Non-restricted faculty and staff lot outside of the fitness center and indoor tennis courts.',
      permits: ['f/s']
    },
    geometry: {
      coordinates: [
        [
          [-73.178348, 44.004339],
          [-73.17822, 44.004277],
          [-73.177428, 44.004985],
          [-73.177557, 44.005047],
          [-73.178348, 44.004339]
        ]
      ],
      type: 'Polygon'
    },
    id: '0ac36e0587f719548969bfe77c7839b0'
  },
  {
    type: 'Feature',
    properties: {
      lot_type: 'T',
      name: 'Field House Lot',
      description:
        'Multi-purpose lot positioned at the end of the Peterson Family Athletics Complex.',
      permits: [
        'sPass',
        'pPass',
        'uPass',
        'ePass',
        'tPass',
        'visitors',
        'f/s',
        'f/s_r'
      ]
    },
    geometry: {
      coordinates: [
        [
          [-73.180101, 44.00249],
          [-73.179423, 44.00306],
          [-73.178643, 44.002628],
          [-73.178816, 44.00248],
          [-73.180101, 44.00249]
        ]
      ],
      type: 'Polygon'
    },
    id: '0e4b8a62b0830fe988fef86e62713e34'
  }
];

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

describe('App shallow rendering tests', () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  describe('App component initial content', () => {
    test('Contains a form component', () => {
      expect(app.contains(Form)).toEqual(true);
    });

    test('Contains a parking map component', () => {
      expect(app.contains(ParkingMap)).toEqual(true);
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
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterAll(() => {
    global.fetch.mockClear();
  });

  test('Smoke test', async () => {
    const comp = mount(<App />);
    await act(async () => await flushPromises());
    comp.update();
  });

  test('Test that parking map appears after form is submitted on landing page', async () => {
    const comp = mount(<App />);
    await act(async () => await flushPromises());
    comp.update();
    button = comp.find('button');
    expect(comp.find('ParkingMap')).toBeFalsy();
    button.simulate('click');
    expect(comp.find('ParkingMap')).toBeTruthy();
  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
