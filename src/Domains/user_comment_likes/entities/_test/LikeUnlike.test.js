const LikeUnlike = require('../LikeUnlike');

describe('LikeUnlike entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      commentId: 'thread-123',
    };

    expect(() => new LikeUnlike(payload)).toThrowError('LIKE_UNLIKE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      threadId: 'thread-123',
      commentId: 123,
      userId: true,
    };

    expect(() => new LikeUnlike(payload)).toThrowError('LIKE_UNLIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create LikeUnlike entities correctly', () => {
    const payload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      userId: 'user-123',
    };

    const newComment = new LikeUnlike(payload);

    expect(newComment).toBeInstanceOf(LikeUnlike);
    expect(newComment.threadId).toEqual(payload.threadId);
    expect(newComment.commentId).toEqual(payload.commentId);
    expect(newComment.userId).toEqual(payload.userId);
  });
});
