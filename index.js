function createEmployeeRecord(record) {
  const firstName = record[0];
  const familyName = record[1];
  const title = record[2];
  const payPerHour = record[3];
  
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}


/*
function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  */
  
  function createEmployeeRecords(arrays) {
    return arrays.map(record => createEmployeeRecord(record));
  }
  

  function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }

  
  function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }

  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    if (!timeIn || !timeOut) {
      return 0;
    }
    
    // Calculate hours worked
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    
    return hoursWorked;
  }
  
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const rate = employee.payPerHour;
    
    return hoursWorked * rate;
  }

  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
    
    return totalWages;
  }

  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }
  