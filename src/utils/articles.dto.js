const toDto = (article) => ({
  id: article._id,
  title: article.title,
  slug: article.slug,
  content: article.content,
  tags: article.tags,
  status: article.status,
  authorId: article.authorId,
  createdAt: article.createdAt,
  updatedAt: article.updatedAt,
  links: {
    self: `/api/articles/${article._id}`
  }
});

module.exports = { toDto };
