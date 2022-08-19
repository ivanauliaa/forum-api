const GetCommentLikesCount = require('../../../Domains/user_comment_likes/entities/GetCommentLikesCount');

class GetCommentLikesCountUseCase {
  constructor({ userCommentLikeRepository, threadRepository, commentRepository }) {
    this._userCommentLikeRepository = userCommentLikeRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const payload = new GetCommentLikesCount(useCasePayload);

    await this._threadRepository.verifyThreadAvailability(payload.threadId);
    await this._commentRepository.verifyCommentAvailability(payload.commentId);

    return this._userCommentLikeRepository.getCommentLikesCount(payload);
  }
}

module.exports = GetCommentLikesCountUseCase;
