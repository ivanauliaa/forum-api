const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const UserCommentLikeRepository = require('../../../../Domains/user_comment_likes/UserCommentLikeRepository');
const GetCommentLikesCountUseCase = require('../GetCommentLikesCountUseCase');
const GetCommentLikesCount = require('../../../../Domains/user_comment_likes/entities/GetCommentLikesCount');

describe('GetCommentLikesCountUseCase', () => {
  it('should orchestrating the like a comment correctly', async () => {
    const useCasePayload = new GetCommentLikesCount({
      threadId: 'thread-123',
      commentId: 'comment-123',
    });

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockUserCommentLikeRepository = new UserCommentLikeRepository();

    mockThreadRepository.verifyThreadAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserCommentLikeRepository.getCommentLikesCount = jest.fn()
      .mockImplementation(() => Promise.resolve(2));

    const getCommentLikesCountUseCase = new GetCommentLikesCountUseCase({
      userCommentLikeRepository: mockUserCommentLikeRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await getCommentLikesCountUseCase.execute(useCasePayload);

    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentAvailability)
      .toBeCalledWith(useCasePayload.commentId);
    expect(mockUserCommentLikeRepository.getCommentLikesCount).toBeCalledWith(useCasePayload);
  });
});
