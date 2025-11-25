const { verifyAccess } = require('../utils/jwt');
const { User } = require('../repositories/users.repo');

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const token = auth.split(' ')[1];
    const payload = verifyAccess(token);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });
    req.user = { id: user._id, role: user.role, username: user.username };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
