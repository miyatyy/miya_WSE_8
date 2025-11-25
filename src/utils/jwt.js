const jwt = require('jsonwebtoken');
const { jwt: jwtConf } = require('../config/env');

const signAccess = (payload) => jwt.sign(payload, jwtConf.accessSecret, { expiresIn: jwtConf.accessExpiresIn });
const signRefresh = (payload) => jwt.sign(payload, jwtConf.refreshSecret, { expiresIn: jwtConf.refreshExpiresIn });

const verifyAccess = (token) => jwt.verify(token, jwtConf.accessSecret);
const verifyRefresh = (token) => jwt.verify(token, jwtConf.refreshSecret);

module.exports = { signAccess, signRefresh, verifyAccess, verifyRefresh };
