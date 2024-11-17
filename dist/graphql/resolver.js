import { getEmployees, getEmployeeById, addEmployee, updateEmployee } from '../controllers/Employee';
const resolvers = {
    Query: {
        listEmployees: async (_, args) => await getEmployees(args),
        getEmployee: async (_, { id }) => await getEmployeeById(id),
    },
    Mutation: {
        addEmployee: async (_, args) => await addEmployee(args),
        updateEmployee: async (_, { id, ...updates }) => {
            const partialUpdates = updates;
            return await updateEmployee(id, partialUpdates);
        },
    },
};
export default resolvers;
