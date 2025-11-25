module.exports = (schema) => (req, res, next) => {
  const data = { ...req.body, ...req.params, ...req.query };
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(422).json({ success: false, message: 'Validation error', details: error.details.map(d => d.message) });
  }
  req.validated = value;
  next();
};
