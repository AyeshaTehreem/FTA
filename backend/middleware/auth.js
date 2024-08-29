const authenticateToken = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next(); 
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

const isAdmin = (req, res, next) => {
  if (req.session && req.session.userId && req.session.role === 'admin') {
    return next(); // If the user is an admin, proceed to the next middleware or route handler
  }
  return res.status(403).json({ message: 'Forbidden: Admins only' }); // If the user is not an admin, return 403 Forbidden status
};

module.exports = { authenticateToken, isAdmin };
