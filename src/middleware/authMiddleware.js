const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Get token from the Authorization header
    const authHeader = req.header('Authorization');

    // Check if no token is provided
    if (!authHeader) {
      console.error('Authorization header missing');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract token by removing the "Bearer " prefix
    const token = authHeader.split(' ')[1];

    if (!token) {
      console.error('Token missing from Authorization header');
      return res.status(401).json({ message: 'Token missing, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set the user ID from the decoded token for further use
    req.user = decoded.userId;

    // Log successful verification
    console.log('Token verified, user ID:', req.user);

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Log detailed error message for invalid tokens
    if (err.name === 'TokenExpiredError') {
      console.error('Token expired:', err.message);
      return res.status(401).json({ message: 'Token expired, please login again' });
    } else if (err.name === 'JsonWebTokenError') {
      console.error('Invalid token:', err.message);
      return res.status(401).json({ message: 'Token is not valid' });
    } else {
      console.error('Authorization error:', err.message);
      return res.status(500).json({ message: 'Server error during token verification' });
    }
  }
};

module.exports = authMiddleware;
