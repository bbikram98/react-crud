export interface Employee {
    id: number;
    name: string;
    birthdate: Date|null;
    department: string;
    experiance: string;
  }
  
  let employees = [
    { id: 1, name: 'John', birthdate: new Date('01/01/1990'), department: 'Software Engineer', experiance: '5' },
    { id: 2, name: 'Michle', birthdate: new Date('01/01/1990'), department: 'Product Manager', experiance: '5' },
  ];
  
  export const getEmployees = () => employees;
  
  export const updateEmployeeData = (updatedData:any) => {
    employees = updatedData;
    return employees;
  };
  
