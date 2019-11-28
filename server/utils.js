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
    const difference = timeOut.getTime() - timeIn.getTime();
    const weekendInMillis = 198000000; // Amount of time outside business hours over weekend

    // If difference between times is longer than a weekend, the
    // stay overlaps with business hours. This accounts for edge case of > week
    if (difference >= weekendInMillis) {
      return true;
    } else if (
      module.exports.checkIfWeekend(timeIn) &&
      module.exports.checkIfWeekend(timeOut)
    ) {
      return false;
    } else if (module.exports.checkIfOffHours(timeIn, timeOut)) {
      return false;
    }
    return true;
  },

  // Construct database query
  constructQuery: (timeIn, timeOut, userType) => {
    const potentialStudentPermits = [
      'Student-sPass',
      'Student-ePass',
      'Student-pPass',
      'Student-tPass',
      'Student-uPass'
    ];

    // Building a list of permit types a lot can have that matches the criteria
    let queryPermits = [];

    // If outside of business hours, push 'f/s' for all but freshman
    if (
      !module.exports.checkIfBusinessHours(timeIn, timeOut) &&
      userType != 'Student-uPass'
    ) {
      queryPermits.push('f/s');
    }
    if (potentialStudentPermits.includes(userType)) {
      queryPermits.push(userType.split('-')[1]);
    }
    if (userType === 'Faculty') {
      queryPermits.push('f/s');
      queryPermits.push('f/s_r');
    }
    if (userType === 'Visitor') {
      queryPermits.push('visitors');
    }

    let query;
    if (queryPermits.length > 0) {
      let queryPermitsFormatted = [];
      queryPermits.forEach(permit => {
        queryPermitsFormatted.push({ 'properties.permits': permit });
      });
      query = { $or: queryPermitsFormatted };
    } else {
      query = { type: 'Feature' };
    }

    return query;
  }
};
