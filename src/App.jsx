import React, { useState } from 'react';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import { FaPlus } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const deleteEmployee = (empId) => {
    setEmployees(employees.filter(emp => emp.empId !== empId));
  };

  const editEmployee = (employee) => {
    setIsEditing(true);
    setCurrentEmployee(employee);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map(emp => (emp.empId === updatedEmployee.empId ? updatedEmployee : emp))
    );
    setIsEditing(false);
  };

  return (
    <div className="App">
      <h1 className='h1'>Employee Management System</h1>
      <EmployeeTable
        employees={employees}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />
      <div className="add-employee">
         <FaPlus className='bg-remove' />Add Employee
      </div>
      <EmployeeForm
        isEditing={isEditing}
        currentEmployee={currentEmployee}
        addEmployee={addEmployee}
        updateEmployee={updateEmployee}
      />
    </div>
  );
};

export default App;
