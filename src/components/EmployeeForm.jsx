import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ isEditing, currentEmployee, addEmployee, updateEmployee }) => {
  const [employee, setEmployee] = useState(
    isEditing ? currentEmployee : { empId: '', empName: '', empAge: '', empDepartment: '', empPosition: '', empSalary: '', empEmail: '' }
  );

  useEffect(() => {
    if (isEditing) {
      setEmployee(currentEmployee);
    }
  }, [isEditing, currentEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateEmployee(employee);
    } else {
      addEmployee({ ...employee, empId: Date.now().toString() });
    }
    setEmployee({ empId: '', empName: '', empAge: '', empDepartment: '', empPosition: '', empSalary: '', empEmail: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="empName"
        placeholder="Name"
        value={employee.empName}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="empAge"
        placeholder="Age"
        value={employee.empAge}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="empDepartment"
        placeholder="Department"
        value={employee.empDepartment}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="empPosition"
        placeholder="Position"
        value={employee.empPosition}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="empSalary"
        placeholder="Salary"
        value={employee.empSalary}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="empEmail"
        placeholder="Email"
        value={employee.empEmail}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
