const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Received Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded User:', decoded);
    
    // Set req.user to the decoded user object
    req.user = { _id: decoded.id }; // Update this line
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware; 