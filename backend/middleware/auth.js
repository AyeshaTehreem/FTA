// Session-based authentication middleware
const authenticateToken = (req, res, next) => {
  // Check if the session exists and if userId is present in the session
  if (req.session && req.session.userId) {
    return next(); // If authenticated, proceed to the next middleware or route handler
  }
  // If not authenticated, return 401 Unauthorized status
  return res.status(401).json({ message: 'Unauthorized' });
};

// Admin role check middleware
const isAdmin = (req, res, next) => {
  // Check if the session exists, userId is present, and the user has the admin role
  if (req.session && req.session.userId && req.session.role === 'admin') {
    return next(); // If the user is an admin, proceed to the next middleware or route handler
  }
  // If the user is not an admin, return 403 Forbidden status
  return res.status(403).json({ message: 'Forbidden: Admins only' });
};

module.exports = { authenticateToken, isAdmin };
