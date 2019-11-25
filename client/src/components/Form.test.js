import React from 'react';
import { shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Form from './Form';
import { Input } from '@material-ui/core';

const dateProp = new Date();
const testCase1 = {
  userType: 'initial',
  timeIn: dateProp,
  timeOut: dateProp,
  date: dateProp
};

describe('Form tests', () => {
  let wrapper;
  const props = {
    userType: testCase1.userType,
    setUser: jest.fn(),
    timeIn: testCase1.timeIn,
    setTimeIn: jest.fn(),
    timeOut: testCase1.timeOut,
    setTimeOut: jest.fn(),
    date: testCase1.date,
    setDate: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<Form {...props} />);
  });

  test('Renders form with 1 select field (for user type)', () => {
    expect(wrapper.find(Select)).toHaveLength(1);
  });
  test('Renders userType dropdown with proper initial value', () => {
    expect(wrapper.find(Select).props().value).toEqual('');
  });
  test('Renders form with 2 KeyboardTimePicker elements (for timeIn and timeOut)', () => {
    expect(wrapper.find(KeyboardTimePicker)).toHaveLength(2);
  });
  test('Renders form with 1 KeyboardDatePicker element', () => {
    expect(wrapper.find(KeyboardDatePicker)).toHaveLength(1);
  });
  test('Make sure callback is called when selecting userType ', () => {
    wrapper
      .find(Select)
      .at(0)
      .simulate('change', { target: { value: 'Student-sPass' } });
    expect(props.setUser).toHaveBeenCalled();
    expect(props.setDate).not.toHaveBeenCalled();
    expect(props.setTimeIn).not.toHaveBeenCalled();
    expect(props.setTimeOut).not.toHaveBeenCalled();
  });
  test('Make sure KeyboardDatePicker has proper initial value', () => {
    expect(wrapper.find(KeyboardDatePicker).props().value).toEqual(dateProp);
  });

  test('Test KeyBoardDatePicker updates inputs', () => {
    const datePicker = wrapper.find(KeyboardDatePicker);
    const newDate = new Date();
    datePicker.value = newDate;
    expect(datePicker.value).toBe(newDate);
  });
});
