import { getEmployees, getEmployeeById, addEmployee, updateEmployee } from '../../controllers/Employee';
import { IEmployee } from '../../models/Employee';
import { registerUser, loginUser } from '../../controllers/User';

const resolvers = {
  Query: {
    // List all employees
    listEmployees: async (_: unknown, args: any, { user }: { user: any }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      return await getEmployees(args);
    },

    // Get employee by ID
    getEmployee: async (_: unknown, { id }: { id: string }, { user }: { user: any }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      return await getEmployeeById(id);
    },
  },

  Mutation: {
    register: async (
      _: unknown,
      { username, email, password, role }: { username: string; email: string; password: string; role: string }
  ) => {
      if (!['user', 'admin'].includes(role)) {
          throw new Error('Invalid role. Role must be "user" or "admin".');
      }
  
      const newUser = await registerUser(username, email, password, role);
      console.log("this is new User from Resolver Mutation>>>>>>", newUser);
  
      // Return the user data as expected by the schema
      return {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
      };
  },
  

    login: async (_: unknown, { email, password }: { email: string, password: string }) => {
      const user: any = await loginUser(email, password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      return {
        token: user.token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
    },

    addEmployee: async (_: unknown, args: IEmployee, { user }: { user: any }) => {
      if (!user) {
        throw new Error('Authentication required');
      }
      return await addEmployee(args);
    },

    // Update employee (requires admin role)
    updateEmployee: async (
      _: unknown,
      { id, ...updates }: { id: string; name?: string; age?: number; class?: string; subjects?: string[]; attendance?: Date[] },
      { user }: { user: any }
    ) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      if (user.role !== 'admin') {
        throw new Error('Access denied. Only admins can update employees.');
      }

      const partialUpdates: Partial<IEmployee> = updates;
      return await updateEmployee(id, partialUpdates);
    },
  },
};

export default resolvers;
