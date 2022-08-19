/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const UserCommentLikesTableTestHelper = {
  async addLike({
    id = 'like-123',
    commentId = 'comment-123',
    userId = 'user-123',
  }) {
    const stmt = {
      text: 'INSERT INTO user_comment_likes VALUES($1, $2, $3)',
      values: [id, commentId, userId],
    };

    await pool.query(stmt);
  },
  async findById(id) {
    const stmt = {
      text: 'SELECT * FROM user_comment_likes WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(stmt);
    return result.rows;
  },
  async cleanTable() {
    const stmt = 'TRUNCATE user_comment_likes';
    await pool.query(stmt);
  },
};

module.exports = UserCommentLikesTableTestHelper;
