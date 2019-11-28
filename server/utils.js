module.exports = {
  // Check if a given time is on the weekend (in terms of business hours)
  checkIfWeekend: time => {
    const wkndDays = [0, 6];

    if (
      wkndDays.includes(time.getDay()) ||
      (time.getDay() === 5 && time.getHours >= 17)
    ) {
      return true;
    }
    return false;
  },

  // Check if a given in/out time happen during off-business hours
  checkIfOffHours: (timeIn, timeOut) => {
    // Make sure they are on the same day (including midnight of next day)
    if (timeIn.getDay() === timeOut.getDay()) {
      if (timeIn.getHours() >= 17 && timeOut.getHours() >= 17) {
        return true;
      }
    } else if (timeOut.getDay() - timeIn.getDay() === 1) {
      if (
        timeIn.getHours() >= 17 &&
        (timeOut.getHours() === 0 &&
          timeOut.getMinutes() === 0 &&
          timeOut.getSeconds() === 0 &&
          timeOut.getMilliseconds() === 0)
      ) {
        return true;
      }
    }

    return false;
  },

  // Check if time overlaps with business hours
  checkIfBusinessHours: (timeIn, timeOut) => {
    const difference = timeOut.toTime() - timeIn.toTime();
    const weekendInMillis = 198000000; // Amount of time outside business hours over weekend

    // If difference between times is longer than a weekend, the
    // stay overlaps with business hours. This accounts for edge case of > week
    if (difference >= weekendInMillis) {
      return true;
    } else if (module.exports.checkIfWeekend()) {
      return false;
    } else if (module.exports.checkIfOffHours()) {
      return false;
    }
    return true;
  },

  // Construct database query
  constructQuery: (timeIn, timeOut, userType) => {
    // Get the time in and time out.
    const timeInHour = timeIn.getHours();
    const timeInDay = timeIn.getDay();
    const timeOutHour = timeOut.getHours();
    const timeOutDay = timeOut.getDay();

    const potentialStudentPermits = [
      'Student-sPass',
      'Student-ePass',
      'Student-pPass',
      'Student-tPass',
      'Student-uPass'
    ];

    // Check permit type of user
    let studentPermitType;
    if (potentialStudentPermits.includes(userType)) {
      // eslint-disable-next-line prefer-destructuring
      studentPermitType = userType.split('-')[1];
    }

    let query = { type: 'Feature' };
    if (
      module.exports.checkIfWeekend(timeInDay, timeInHour) &&
      module.exports.checkIfWeekend(timeOutDay, timeOutHour)
    ) {
      if (potentialStudentPermits.includes(userType)) {
        query = {
          $or: [
            { 'properties.permits': studentPermitType },
            { 'properties.f/s': 'true' }
          ]
        };
      } else if (userType === 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      } else if (userType === 'Visitor') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.visitor': 'true' }]
        };
      }
    } else {
      if (potentialStudentPermits.includes(userType)) {
        if (studentPermitType) {
          query = { 'properties.permits': studentPermitType };
        } else {
          query = { 'properties.permits': { $exists: true, $ne: [] } };
        }
      }
      if (userType === 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      }
      if (userType === 'Visitor') {
        query = { 'properties.visitors': 'true' };
      }
    }
    return query;
  }
};
