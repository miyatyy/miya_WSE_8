const authService = require('../services/auth.service');
const { success, error } = require('../utils/response');

exports.register = async (req, res, next) => {
  try {
    const u = await authService.register(req.body);
    success(res, u, 'Registered', 201);
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    success(res, data, 'Logged in', 200);
  } catch (err) { next(err); }
};

exports.refresh = async (req, res, next) => {
  try {
    const data = await authService.refresh(req.body);
    success(res, data, 'Refreshed', 200);
  } catch (err) { next(err); }
};

exports.logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id);
    success(res, null, 'Logged out', 200);
  } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
  try {
    success(res, { id: req.user.id, username: req.user.username, role: req.user.role }, 'OK', 200);
  } catch (err) { next(err); }
};
