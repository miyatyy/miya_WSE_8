const { Article } = require('../repositories/articles.repo');

const createArticle = async ({ title, content, tags = [], status = 'draft', authorId }) => {
  const art = await Article.create({ title, content, tags, status, authorId });
  return art;
};

const findArticles = async ({ page=1, limit=10, status='published', tag, q, sortBy='createdAt', order='desc' }) => {
  const filter = {};
  if (status) filter.status = status;
  if (tag) filter.tags = tag;
  if (q) filter.$or = [
    { title: new RegExp(q,'i') },
    { content: new RegExp(q,'i') }
  ];
  const skip = (page - 1) * limit;
  const results = await Article.find(filter).sort({ [sortBy]: order === 'asc' ? 1 : -1 }).skip(skip).limit(limit);
  const total = await Article.countDocuments(filter);
  return { results, page, limit, total };
};

const getArticleById = async (id) => {
  return Article.findById(id);
};

const updateArticle = async (id, data) => {
  return Article.findByIdAndUpdate(id, data, { new: true });
};

const deleteArticle = async (id) => {
  return Article.findByIdAndDelete(id);
};

module.exports = { createArticle, findArticles, getArticleById, updateArticle, deleteArticle };
