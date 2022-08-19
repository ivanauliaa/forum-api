class GetCommentLikesCount {
  constructor(payload) {
    this._verifyPayload(payload);

    this.threadId = payload.threadId;
    this.commentId = payload.commentId;
  }

  _verifyPayload({
    threadId, commentId,
  }) {
    if (!threadId || !commentId) {
      throw new Error('GET_COMMENT_LIKES_COUNT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string' || typeof commentId !== 'string') {
      throw new Error('GET_COMMENT_LIKES_COUNT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = GetCommentLikesCount;
