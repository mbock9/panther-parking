import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import App from './App';
import Form from './components/Form';
import ParkingMap from './components/ParkingMap';

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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
