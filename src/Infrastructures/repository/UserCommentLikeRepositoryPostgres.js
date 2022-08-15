const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const UserCommentLikeRepository = require('../../Domains/user_comment_likes/UserCommentLikeRepository');

class UserCommentLikeRepositoryPostgres extends UserCommentLikeRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async likeComment(payload) {
    const { commentId, userId } = payload;
    const id = `like-${this._idGenerator()}`;

    const stmt = {
      text: 'INSERT INTO user_comment_likes VALUES($1, $2, $3)',
      values: [id, commentId, userId],
    };

    await this._pool.query(stmt);
  }

  async unlikeComment(payload) {
    const { commentId, userId } = payload;

    const stmt = {
      text: 'DELETE FROM user_comment_likes WHERE comment_id = $1 AND user_id = $2 RETURNING id',
      values: [commentId, userId],
    };

    const result = await this._pool.query(stmt);

    if (!result.rowCount) {
      throw new NotFoundError('like tidak ditemukan');
    }
  }

  async checkLikeExistence(payload) {
    const { commentId, userId } = payload;

    const stmt = {
      text: 'SELECT comment_id FROM user_comment_likes WHERE comment_id = $1 AND user_id = $2',
      values: [commentId, userId],
    };

    const result = await this._pool.query(stmt);

    return result.rowCount;
  }

  async getCommentLikesCount(commentId) {
    const stmt = {
      text: 'SELECT comment_id FROM user_comment_likes WHERE comment_id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(stmt);

    return result.rowCount;
  }
}

module.exports = UserCommentLikeRepositoryPostgres;
