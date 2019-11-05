import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import App from './App';
import Form from './components/Form';
import ParkingMap from './components/ParkingMap';

describe('App shallow rendering tests', () => {
  let app;

  beforeEach(() => {
    app = shallow(<App />);
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
      expect(app).toContainExactlyOneMatchingElement(Form);
    });

    test('Contains a parking map component', () => {
      expect(app.toContainMatchingElement(ParkingMap));
    });
  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
