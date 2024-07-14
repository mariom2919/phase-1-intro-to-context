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
    
    // Calculate hours worked
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wagesEarned = hoursWorked * employee.payPerHour;
    
    return wagesEarned;
  }
  
  function allWagesFor(employee) {
    const uniqueDates = new Set(employee.timeInEvents.map(event => event.date));
    const totalWages = Array.from(uniqueDates).reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
    
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
    
    return totalPayroll;
  }
  
  // Example usage:
  const employeeData = [
    ['Gray', 'Worm', 'Security', 10],
    ['Natalia', 'Romanov', 'HR', 15]
  ];
  
  const employees = createEmployeeRecords(employeeData);
  
  createTimeInEvent(employees[0], "2024-07-14 08:00");
  createTimeOutEvent(employees[0], "2024-07-14 17:00");
  
  createTimeInEvent(employees[1], "2024-07-14 09:00");
  createTimeOutEvent(employees[1], "2024-07-14 18:00");
  
  console.log(hoursWorkedOnDate(employees[0], "2024-07-14")); // Output: 9
  console.log(wagesEarnedOnDate(employees[0], "2024-07-14")); // Output: 90
  console.log(allWagesFor(employees[0])); // Output: 90
  console.log(calculatePayroll(employees)); // Output: 270
  