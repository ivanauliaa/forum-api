const DeleteComment = require('../DeleteComment');

describe('DeleteComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      threadId: 'thread-123',
    };

    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      threadId: 123,
      commentId: true,
      owner: 'user-123',
    };

    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create DeleteComment entities correctly', () => {
    const payload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      owner: 'user-123',
    };

    const newComment = new DeleteComment(payload);

    expect(newComment).toBeInstanceOf(DeleteComment);
    expect(newComment.threadId).toEqual(payload.threadId);
    expect(newComment.commentId).toEqual(payload.commentId);
    expect(newComment.owner).toEqual(payload.owner);
  });
});
