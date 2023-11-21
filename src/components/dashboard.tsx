import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEmployees, updateEmployeeData } from "../data/data";

const EmployeeDashboard: React.FC = () => {
  const employeeList = getEmployees();
  const navigate = useNavigate();

  //delete function
  const handleDelete = (id: number): void => {
    const updatedData = employeeList.filter(
      (employee: any) => employee.id !== id
    );
    updateEmployeeData(updatedData);
    navigate("/");
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      {
        <div>
          <button type="button" className="btn btn-success">
            <Link className="text-decoration-none text-black" to="/add">
              Add Employee
            </Link>
          </button>
        </div>
      }
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Birthdate</th>
            <th>department</th>
            <th>experiance</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.birthdate.toDateString()}</td>
              <td>{employee.department}</td>
              <td>{employee.experiance}</td>
              <td>
                <Link to={`/edit/${employee.id}`}>
                  <button type="button" className="btn btn-primary">
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                {" "}
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
