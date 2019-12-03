import React from 'react';
import Sidebar from './Sidebar';
import { createShallow } from '@material-ui/core/test-utils';

const dateProp = new Date();

const testCase1 = {
  userType: 'initial',
  timeIn: dateProp,
  timeOut: dateProp,
  mobileOpen: false,
  landing: false
};

const props = {
  userType: testCase1.userType,
  timeIn: testCase1.timeIn,
  timeOut: testCase1.timeOut,
  mobileOpen: testCase1.mobileOpen,
  setMobileOpen: jest.fn(),
  landing: testCase1.landing,
  changeLandingPage: jest.fn(),
  setUser: jest.fn()
};

describe('Sidebar tests', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<Sidebar {...props} />);
  });

  test('Renders an empty div before fetching parkable lots via API', () => {
    //   console.log(wrapper.find(Drawer).debug())
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
