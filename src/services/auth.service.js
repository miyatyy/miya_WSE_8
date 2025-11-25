const bcrypt = require('bcrypt');
const { User } = require('../repositories/users.repo');
const { signAccess, signRefresh, verifyRefresh } = require('../utils/jwt');
const { saltRounds } = require('../config/env');

const register = async ({ username, password, role='user' }) => {
  const exists = await User.findOne({ username });
  if (exists) throw { status: 409, message: 'Username already exists' };
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const u = await User.create({ username, passwordHash, role });
  return { id: u._id, username: u.username, role: u.role };
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw { status: 401, message: 'Invalid credentials' };
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw { status: 401, message: 'Invalid credentials' };
  const payload = { sub: user._id, role: user.role, username: user.username };
  const accessToken = signAccess(payload);
  const refreshToken = signRefresh({ sub: user._id });
  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken, user: { id: user._id, username: user.username, role: user.role } };
};

const refresh = async ({ refreshToken }) => {
  if (!refreshToken) throw { status: 400, message: 'Missing refresh token' };
  const payload = verifyRefresh(refreshToken);
  const user = await User.findById(payload.sub);
  if (!user || user.refreshToken !== refreshToken) throw { status: 401, message: 'Invalid refresh token' };
  const newAccess = signAccess({ sub: user._id, role: user.role, username: user.username });
  const newRefresh = signRefresh({ sub: user._id });
  user.refreshToken = newRefresh;
  await user.save();
  return { accessToken: newAccess, refreshToken: newRefresh };
};

const logout = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;
  user.refreshToken = null;
  await user.save();
};

module.exports = { register, login, refresh, logout };
