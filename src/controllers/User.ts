import { IEmployee } from '../models/Employee';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/auth-middleware';

export const registerUser = async (username: string, email: string, password: string, role: string = 'user') => {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already registered');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user:any = new User({
        username,
        email,
        password: hashedPassword,
        role,
    });

    await user.save();

    console.log("this is user>>>>>>>>>>>>>>>>>>>>", user);

    // Generate JWT token
    const token = generateToken(user);

    // Return the user data and token
    return {
        id: user._id, // Convert _id to string for GraphQL compatibility
        username: user.username,
        email: user.email,
        role: user.role
    };
};

  
  export const loginUser = async (email: string, password: string): Promise<string> => {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
  
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
  
    // Generate JWT token
    const token = generateToken(user);
    let Detail:any = {
        token,
        _id: user._id,
        email:  user.email,
        username: user.username,
        role: user.role
    }
    return Detail;
  };
  