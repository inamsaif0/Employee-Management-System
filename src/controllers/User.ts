import { IEmployee } from '../models/Employee';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/auth-middleware';

export const registerUser = async (username: string, email: string, password: string, role: string = 'user') => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: any = new User({
        username,
        email,
        password: hashedPassword,
        role,
    });

    await user.save();

    // Return the user data and token
    return {
        id: user._id, // Convert _id to string for GraphQL compatibility
        username: user.username,
        email: user.email,
        role: user.role
    };
};


export const loginUser = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user);
    let Detail: any = {
        token,
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
    }
    return Detail;
};
