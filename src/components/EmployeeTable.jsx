import React, { useState } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const EmployeeTable = ({ employees, deleteEmployee, editEmployee }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'empId', disableSortBy: true },
      { Header: 'Name', accessor: 'empName' },
      { Header: 'Age', accessor: 'empAge' },
      { Header: 'Department', accessor: 'empDepartment' },
      { Header: 'Position', accessor: 'empPosition' },
      { Header: 'Salary', accessor: 'empSalary' },
      { Header: 'Email', accessor: 'empEmail' },
      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ row }) => (
          <div>
            <FaEdit onClick={() => editEmployee(row.original)} />
            <FaTrash onClick={() => deleteEmployee(row.original.empId)} />
          </div>
        ),
      },
    ],
    [editEmployee, deleteEmployee]
  );

  const data = React.useMemo(() => employees, [employees]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(name, value);
  };

  return (
    <div>
      <div className="filter-inputs">
        {columns.map(column => (
          column.accessor !== 'empId' && column.accessor !== 'actions' && (
            <input
              key={column.accessor}
              name={column.accessor}
              placeholder={`Filter by ${column.Header}`}
              onChange={handleFilterChange}
            />
          )
        ))}
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.canSort && (
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <FaSortDown />
                          : <FaSortUp />
                        : <FaSort />}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
