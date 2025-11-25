const { v4: uuidv4 } = require('uuid');

module.exports = (req, res, next) => {
  let cid = req.header('x-correlation-id') || uuidv4();
  req.correlationId = cid;
  res.setHeader('x-correlation-id', cid);
  next();
};
