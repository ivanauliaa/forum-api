const UserCommentLikeRepository = require('../UserCommentLikeRepository');

describe('UserCommentLikeRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const threadRepository = new UserCommentLikeRepository();

    await expect(threadRepository.likeComment({})).rejects.toThrowError('USER_COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.unlikeComment({})).rejects.toThrowError('USER_COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.checkLikeExistence({})).rejects.toThrowError('USER_COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.getCommentLikesCount('')).rejects.toThrowError('USER_COMMENT_LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
