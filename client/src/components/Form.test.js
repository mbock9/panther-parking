import React from 'react';
import { shallow, mount } from 'enzyme';

import Form from './Form';

const testCase1 = {
  permitType: 'x',
  userType: 'student',
  timeIn: '1:00AM',
  timeOut: ''
};

const testCase2 = {
  permitType: 's',
  userType: 'student',
  timeIn: '1:00AM',
  timeOut: ''
};

describe('Form tests', () => {
  let form;

  beforeEach(() => {
    form = mount(
      <Form
        permitType={testCase1.permitType}
        setPermit={jest.fn}
        userType={testCase1.userType}
        setUser={jest.fn}
        timeIn={testCase1.timeIn}
        setTimeIn={jest.fn}
        timeOut={testCase1.timeOut}
        setTimeOut={jest.fn}
      />
    );
  });

  test('Renders form', () => {
    const formItems = form.find(Form).find('select');
    expect(formItems).toHaveLength(4);
  });
});
