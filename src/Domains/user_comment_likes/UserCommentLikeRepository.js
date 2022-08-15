class UserCommentLikeRepository {
  async likeComment(commentId, userId) {
    throw new Error('USER_COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async unlikeComment(commentId, userId) {
    throw new Error('USER_COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkLikeExistence(commentId, userId) {
    throw new Error('USER_COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCommentLikesCount(commentId) {
    throw new Error('USER_COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = UserCommentLikeRepository;
