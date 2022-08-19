const GetCommentLikesCount = require('../GetCommentLikesCount');

describe('GetCommentLikesCount entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      commentId: 'thread-123',
    };

    expect(() => new GetCommentLikesCount(payload)).toThrowError('GET_COMMENT_LIKES_COUNT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      threadId: 'thread-123',
      commentId: 123,
    };

    expect(() => new GetCommentLikesCount(payload)).toThrowError('GET_COMMENT_LIKES_COUNT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create GetCommentLikesCount entities correctly', () => {
    const payload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    const newComment = new GetCommentLikesCount(payload);

    expect(newComment).toBeInstanceOf(GetCommentLikesCount);
    expect(newComment.threadId).toEqual(payload.threadId);
    expect(newComment.commentId).toEqual(payload.commentId);
  });
});
