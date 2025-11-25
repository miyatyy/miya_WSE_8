const success = (res, data = null, message = 'OK', status = 200) =>
  res.status(status).json({ success: true, message, data });

const error = (res, message = 'Internal Server Error', status = 500) =>
  res.status(status).json({ success: false, message });

module.exports = { success, error };
