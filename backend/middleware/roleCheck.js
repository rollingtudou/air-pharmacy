exports.isAdmin = (req, res, next) => {
  if (req.userData.role !== 'admin') {
    return res.status(403).json({
      message: '权限不足'
    });
  }
  next();
};

exports.isOperator = (req, res, next) => {
  if (!['admin', 'operator'].includes(req.userData.role)) {
    return res.status(403).json({
      message: '权限不足'
    });
  }
  next();
}; 