module.exports = {
  // Check if time falls into weekend hours
  checkIfWeekend: function(day, hourIn) {
    // Saturday == 6 && Sunday == 0 && Friday == 5
    if (day === 0 || day === 6) {
      return true;
    }
    if (day === 5) {
      if (hourIn >= 17) {
        return true;
      }
    }
    return false;
  },

  // Construct database query
  constructQuery: function(timeIn, timeOut, userType) {
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
