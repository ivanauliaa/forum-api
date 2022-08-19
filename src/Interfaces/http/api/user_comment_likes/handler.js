const LikeUnlikeCommentUseCase = require('../../../../Applications/use_case/user_comment_likes/LikeUnlikeCommentUseCase');

class UserCommentLikesHandler {
  constructor(container) {
    this._container = container;

    this.putLikeUnlikeCommentHandler = this.putLikeUnlikeCommentHandler.bind(this);
  }

  async putLikeUnlikeCommentHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { threadId, commentId } = request.params;

    const likeUnlikeCommentUseCase = this._container.getInstance(LikeUnlikeCommentUseCase.name);
    await likeUnlikeCommentUseCase.execute({
      userId,
      threadId,
      commentId,
    });

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = UserCommentLikesHandler;
