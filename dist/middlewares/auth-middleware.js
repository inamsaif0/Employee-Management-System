import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
};
export const authenticateToken = (req, next) => {
    const token = req.headers['authorization'];
    if (!token)
        throw new Error('Access Denied');
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        throw new Error('Invalid Token');
    }
};
