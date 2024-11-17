import Employee, { IEmployee } from '../models/Employee';

interface FilterOptions {
  filter?: string;
  limit?: number;
  offset?: number;
}

export const getEmployees = async ({
  filter,
  limit,
  offset,
  
}: FilterOptions): Promise<IEmployee[]> => {
  const query = filter ? { name: { $regex: filter, $options: 'i' } } : {};
  return await Employee.find(query).sort().skip(offset || 0).limit(limit || 10);
};

export const getEmployeeById = async (id: string): Promise<IEmployee | null> => {
  return await Employee.findById(id);
};

export const addEmployee = async ({
  name,
  age,
  class: empClass,
  subjects,
  attendance,
}: IEmployee): Promise<IEmployee> => {
  const employee = new Employee({ name, age, class: empClass, subjects, attendance });
  return await employee.save();
};

export const updateEmployee = async (
  id: string,
  updates: Partial<IEmployee>
): Promise<IEmployee | null> => {
  return await Employee.findByIdAndUpdate(id, updates, { new: true });
};
