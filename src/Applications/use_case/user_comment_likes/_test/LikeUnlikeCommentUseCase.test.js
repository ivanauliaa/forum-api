const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const UserCommentLikeRepository = require('../../../../Domains/user_comment_likes/UserCommentLikeRepository');
const LikeUnlikeCommentUseCase = require('../LikeUnlikeCommentUseCase');
const LikeUnlike = require('../../../../Domains/user_comment_likes/entities/LikeUnlike');

describe('LikeUnlikeCommentUseCase', () => {
  it('should orchestrating the like a comment correctly', async () => {
    const useCasePayload = new LikeUnlike({
      threadId: 'thread-123',
      commentId: 'comment-123',
      userId: 'user-123',
    });

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockUserCommentLikeRepository = new UserCommentLikeRepository();

    mockThreadRepository.verifyThreadAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserCommentLikeRepository.checkLikeExistence = jest.fn()
      .mockImplementation(() => Promise.resolve(0));
    mockUserCommentLikeRepository.likeComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserCommentLikeRepository.unlikeComment = (() => { });

    const likeUnlikeCommentUseCase = new LikeUnlikeCommentUseCase({
      userCommentLikeRepository: mockUserCommentLikeRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await likeUnlikeCommentUseCase.execute(useCasePayload);

    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentAvailability)
      .toBeCalledWith(useCasePayload.commentId);
    expect(mockUserCommentLikeRepository.checkLikeExistence).toBeCalledWith(useCasePayload);
    expect(mockUserCommentLikeRepository.likeComment).toBeCalledWith(useCasePayload);
  });

  it('should orchestrating the unlike a comment correctly', async () => {
    const useCasePayload = new LikeUnlike({
      threadId: 'thread-123',
      commentId: 'comment-123',
      userId: 'user-123',
      owner: 'user-123',
    });

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockUserCommentLikeRepository = new UserCommentLikeRepository();

    mockThreadRepository.verifyThreadAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserCommentLikeRepository.checkLikeExistence = jest.fn()
      .mockImplementation(() => Promise.resolve(1));
    mockUserCommentLikeRepository.unlikeComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserCommentLikeRepository.likeComment = (() => { });

    const likeUnlikeCommentUseCase = new LikeUnlikeCommentUseCase({
      userCommentLikeRepository: mockUserCommentLikeRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await likeUnlikeCommentUseCase.execute(useCasePayload);

    expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentAvailability)
      .toBeCalledWith(useCasePayload.commentId);
    expect(mockUserCommentLikeRepository.checkLikeExistence).toBeCalledWith(useCasePayload);
    expect(mockUserCommentLikeRepository.unlikeComment).toBeCalledWith(useCasePayload);
  });
});
