const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const AddedComment = require('../../Domains/comments/entities/AddedComment');
const Comment = require('../../Domains/comments/entities/Comment');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment) {
    const { content, owner, threadId } = newComment;
    const id = `comment-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();

    const stmt = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, content, owner, threadId, createdAt],
    };

    const result = await this._pool.query(stmt);

    return new AddedComment({
      ...result.rows[0],
    });
  }

  async deleteCommentById(id) {
    const deletedAt = new Date().toISOString();

    const stmt = {
      text: 'UPDATE comments SET deleted_at = $1 WHERE id = $2',
      values: [deletedAt, id],
    };

    const result = await this._pool.query(stmt);

    if (!result.rowCount) {
      throw new NotFoundError('comment tidak ditemukan');
    }
  }

  async verifyCommentOwner(id, owner) {
    const stmt = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(stmt);

    if (!result.rowCount) {
      throw new NotFoundError('comment tidak ditemukan');
    }

    const comment = result.rows[0];

    if (comment.owner !== owner) {
      throw new AuthorizationError('anda tidak berhak mengakses resource ini');
    }
  }

  async getCommentById(id) {
    const stmt = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(stmt);

    if (!result.rowCount) {
      throw new NotFoundError('comment not found');
    }

    return new Comment({
      ...result.rows[0],
    });
  }
}

module.exports = CommentRepositoryPostgres;
