const articlesService = require('../services/articles.service');
const { toDto } = require('../utils/articles.dto');
const { success } = require('../utils/response');

exports.create = async (req, res, next) => {
  try {
    const payload = { ...req.body, authorId: req.user.id };
    const art = await articlesService.createArticle(payload);
    success(res, toDto(art), 'Created', 201);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const q = {
      page: parseInt(req.query.page || '1', 10),
      limit: parseInt(req.query.limit || '10', 10),
      status: req.query.status || 'published',
      tag: req.query.tag,
      q: req.query.q,
      sortBy: req.query.sortBy || 'createdAt',
      order: req.query.order || 'desc'
    };
    const r = await articlesService.findArticles(q);
    const dto = r.results.map(toDto);
    success(res, { results: dto, total: r.total, page: r.page, limit: r.limit }, 'OK', 200);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const art = await articlesService.getArticleById(req.params.id);
    if (!art || art.status !== 'published') return res.status(404).json({ success: false, message: 'Not Found' });
    success(res, toDto(art), 'OK', 200);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const art = await articlesService.getArticleById(req.params.id);
    if (!art) return res.status(404).json({ success: false, message: 'Not Found' });
    const isOwner = String(art.authorId) === String(req.user.id);
    if (!isOwner && req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden' });
    const updated = await articlesService.updateArticle(req.params.id, req.body);
    success(res, toDto(updated), 'Updated', 200);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    // only admin allowed by spec (module says admin). If you want owner delete allow, adjust here.
    if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden' });
    await articlesService.deleteArticle(req.params.id);
    return res.status(204).send();
  } catch (err) { next(err); }
};
