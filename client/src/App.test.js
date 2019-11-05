import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import App from './App';
import Form from './components/Form';
import ParkingMap from './components/ParkingMap';

describe('App shallow rendering tests', () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  describe('App component initial content', () => {
    test('Has title', () => {
      // toContainMatchingElement doesn't seem to work with JSX
      expect(
        app.containsMatchingElement(
          <h1 className="App-title">Welcome to beta Panther Parking 1.0</h1>
        )
      ).toBe(true);
    });

    test('Contains a form component', () => {
      expect(app.contains(Form)).toEqual(true);
    });

    test('Contains a parking map component', () => {
      expect(app.contains(ParkingMap)).toEqual(true);
    });
  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
