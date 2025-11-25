const { success } = require('../utils/response');
const pkg = require('../../package.json');

exports.health = (req, res) => {
  success(res, { uptime: process.uptime(), env: process.env.NODE_ENV, name: pkg.name }, 'OK', 200);
};
