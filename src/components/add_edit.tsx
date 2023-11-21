import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getEmployees, updateEmployeeData } from "../data/data";

interface Employee {}

//main form function
const EmployeeAdd: React.FC<Employee> = () => {
  
  //using for routing 
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  //state for form fields
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    birthdate: new Date(),
    experiance: '',
    department: "",
  });

  //effect hook to to fetch data for edit as per id
  useEffect(() => {
    if (id) {
      // Fetch employee details based on id and update form data
      const currentEmployees = getEmployees();
      const employee = currentEmployees.find((employee) => employee.id === +id);
      if (employee) {
        setFormData({
          id: employee.id,
          name: employee.name,
          department: employee.department,
          birthdate: new Date(employee.birthdate || new Date()), // Format date,
          experiance: employee.experiance,
        });
      }
    }
  }, [id]);

  //function to handle datechange using datepicker
  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({ ...prevData, birthdate: date || new Date() }));
  };

  //function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //state to handle form filed validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    // Validate name (required)
    if (formData.name === "") {
      newErrors.name = "Name is required";
    }

    else if (!/^[A-Z ]+$/.test(formData.name)) {
      newErrors.name = "Name should only contain capital letters";
    }

    if (formData.department === "") {
      newErrors.department = "Department is required";
    }
    else if(!/^[a-zA-Z ]+$/.test(formData.department)) {
      newErrors.department = "Department should only contain letters";
    }

    if (formData.experiance === null) {
      newErrors.experiance = "Experiance is required";
    }

    else if(!/^[0-9]+$/.test(formData.experiance)) {
      newErrors.experiance = "Experiance should only contain numbers";
    }


    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      if (id) {
        // Edit existing employee
        const currentEmployees = getEmployees();
        const updatedData = currentEmployees.map((employee) =>
          employee.id === formData.id ? { ...employee, ...formData } : employee
        );
        updateEmployeeData(updatedData);
        navigate("/");
      } else {
        // Add new employee
        const currentEmployees = getEmployees();
        const newEmployee = {
          ...formData,
          id: currentEmployees.length + 1,
        };
        const updatedData = [...currentEmployees, newEmployee];
        updateEmployeeData(updatedData);
        navigate("/");
      }
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className="ms-5">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <div>
            <input
              type="text"
              className="form-control-md"
              title="name"
              value={formData.name}
              onChange={(e) => handleInputChange(e)}
              name="name"
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Birthdate</label>
          <div>
            <DatePicker
              selected={formData.birthdate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Experience</label>
          <div>
            <input
              type="string"
              className="form-control-md"
              title="exp"
              value={formData.experiance}
              onChange={handleInputChange}
              name="experiance"
            />
            {errors.experiance && <div className="error">{errors.experiance}</div>}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <div>
            <input
              type="text"
              title="dept"
              className="form-control-md"
              value={formData.department}
              onChange={handleInputChange}
              name="department"
            />
            {errors.department && (
              <div className="error">{errors.department}</div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeAdd;
