const LikeUnlike = require('../../../Domains/user_comment_likes/entities/LikeUnlike');

class LikeCommentUseCase {
  constructor({ userCommentLikeRepository, threadRepository, commentRepository }) {
    this._userCommentLikeRepository = userCommentLikeRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const payload = new LikeUnlike(useCasePayload);

    await this._threadRepository.verifyThreadAvailability(payload.threadId);
    await this._commentRepository.verifyCommentAvailability(payload.commentId);

    const isExists = await this._userCommentLikeRepository
      .checkLikeExistence(useCasePayload);

    if (isExists) {
      await this._userCommentLikeRepository.unlikeComment(payload);
    } else {
      await this._userCommentLikeRepository.likeComment(payload);
    }
  }
}

module.exports = LikeCommentUseCase;
