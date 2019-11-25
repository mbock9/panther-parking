import React from 'react';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Form from './Form';

const testCase1 = {
  userType: 'initial',
  timeIn: new Date(),
  timeOut: new Date(),
  date: new Date()
};

describe('Form tests', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      userType: testCase1.userType,
      setUser: jest.fn,
      timeIn: testCase1.timeIn,
      setTimeIn: jest.fn,
      timeOut: testCase1.timeOut,
      setTimeOut: jest.fn,
      date: testCase1.date,
      setDate: jest.fn
    };
    wrapper = shallow(<Form {...props} />);
  });

  test('Renders form with 1 select field (for user type)', () => {
    expect(wrapper.find(Select)).toHaveLength(1);
  });
  test('Renders userType dropdown with proper initial value', () => {
    expect(wrapper.find(Select).props().value).toEqual('');
  });
  test('Renders form with 2 KeyboardDateTimePicker elements (for timeIn and timeOut)', () => {
    expect(wrapper.find(KeyboardDateTimePicker)).toHaveLength(2);
  });
});
