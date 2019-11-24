import React from 'react';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Form from './Form';

const testCase1 = {
  permitType: 'sPass',
  userType: 'Student',
  timeIn: new Date(),
  timeOut: new Date(),
  date: new Date()
};

describe('Form tests', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      permitType: testCase1.permitType,
      setPermit: jest.fn,
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

  test('Renders form with 2 select fields (for user type)', () => {
    expect(wrapper.find(Select)).toHaveLength(1);
  });
  test('Renders form with 2 KeyboardTimePicker elements (for timeIn and timeOut)', () => {
    expect(wrapper.find(KeyboardTimePicker)).toHaveLength(2);
  });
  test('Renders form with 1 KeyboardDatePicker element', () => {
    expect(wrapper.find(KeyboardDatePicker)).toHaveLength(1);
  });
});
