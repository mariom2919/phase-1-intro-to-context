function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => createEmployeeRecord(...employee));
  }
  
  function createTimeInEvent(employee, timeStamp) {
    const [date, time] = timeStamp.split(' ');
    employee.timeInEvents.push({ type: 'TimeIn', date, hour: parseInt(time) });
    return employee;
  }
  
  function createTimeOutEvent(employee, timeStamp) {
    const [date, time] = timeStamp.split(' ');
    employee.timeOutEvents.push({ type: 'TimeOut', date, hour: parseInt(time) });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    if (!timeIn || !timeOut) return 0;
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const uniqueDates = new Set(employee.timeInEvents.map(event => event.date));
    return Array.from(uniqueDates).reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  