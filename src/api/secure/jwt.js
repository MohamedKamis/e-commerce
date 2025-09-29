import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  PEPPER,
} = process.env;

const verifyAuthToken = (req, res, next) => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;
  if (!TOKEN_SECRET) {
    return res.status(500).json({ error: 'Token secret is not defined' });
  }
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }
    const decoded = jwt.verify(token, TOKEN_SECRET);
    // Optionally attach decoded token to request object
    // req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      error:
        'Access denied, invalid token. Please go to (http://localhost:2000/user/log)',
    });
  }
};
export {
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  PEPPER,
};