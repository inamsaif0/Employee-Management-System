import Employee from '../models/Employee';
export const getEmployees = async ({ filter, limit, offset, }) => {
    const query = filter ? { name: { $regex: filter, $options: 'i' } } : {};
    // const sort = sortBy ? { [sortBy]: order === 'desc' ? -1 : 1 } : {};
    return await Employee.find(query).sort().skip(offset || 0).limit(limit || 10);
};
export const getEmployeeById = async (id) => {
    return await Employee.findById(id);
};
export const addEmployee = async ({ name, age, class: empClass, subjects, attendance, }) => {
    const employee = new Employee({ name, age, class: empClass, subjects, attendance });
    return await employee.save();
};
export const updateEmployee = async (id, updates) => {
    return await Employee.findByIdAndUpdate(id, updates, { new: true });
};
