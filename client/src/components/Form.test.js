import React from 'react';
import Select from '@material-ui/core/Select';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Form from './Form';
import { createMount, createShallow } from '@material-ui/core/test-utils';

const dateProp = new Date();

const testCase1 = {
  userType: 'initial',
  timeIn: dateProp,
  timeOut: dateProp,
  date: dateProp
};

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

describe('Form tests', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
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
  test('Test that all Date/Time pickers have the has proper initial value', () => {
    expect(wrapper.find(KeyboardDatePicker).props().value).toEqual(dateProp);
    expect(
      wrapper
        .find(KeyboardTimePicker)
        .at(0)
        .props().value
    ).toEqual(dateProp);
    expect(
      wrapper
        .find(KeyboardTimePicker)
        .at(1)
        .props().value
    ).toEqual(dateProp);
  });
  test('Test KeyBoardDatePicker updates inputs', () => {
    const datePicker = wrapper.find(KeyboardDatePicker);
    const newDate = new Date();
    datePicker.value = newDate;
    expect(datePicker.value).toBe(newDate);
  });
});

describe('Time Picker Tests', () => {
  let newDate;
  let mount;
  let mountedForm;
  beforeEach(() => {
    newDate = new Date();
    mount = createMount();
    mountedForm = mount(<Form {...props} />);
  });

  afterEach(() => {
    mount.cleanUp();
  });

  test('Test that setDate callback is called when date is changed', () => {
    mountedForm
      .find('input')
      .at(1)
      .simulate('change', { target: { value: newDate.toISOString() } });
    expect(props.setDate).toHaveBeenCalled();
    expect(props.setTimeIn).not.toHaveBeenCalled();
    expect(props.setTimeOut).not.toHaveBeenCalled();
  });

  test('Test that setTimeIn callback is called when timeIn is changed', () => {
    mountedForm
      .find('input')
      .at(2)
      .simulate('change', { target: { value: newDate.toISOString() } });
    expect(props.setTimeIn).toHaveBeenCalled();
    expect(props.setTimeOut).not.toHaveBeenCalled();
  });

  test('Test that setTimeOut callback is called when timeOut is changed', () => {
    mountedForm
      .find('input')
      .at(3)
      .simulate('change', { target: { value: newDate.toISOString() } });
    expect(props.setTimeOut).toHaveBeenCalled();
  });
});
