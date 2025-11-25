const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articles.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createArticle, updateArticle } = require('../utils/articles.validation');

// public
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);

// protected
router.post('/', auth, validate(createArticle), ctrl.create);
router.put('/:id', auth, validate(updateArticle), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
