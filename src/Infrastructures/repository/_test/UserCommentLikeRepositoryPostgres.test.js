const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UserCommentLikesTableTestHelper = require('../../../../tests/UserCommentLikesTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const LikeUnlike = require('../../../Domains/user_comment_likes/entities/LikeUnlike');
const pool = require('../../database/postgres/pool');
const UserCommentLikeRepositoryPostgres = require('../UserCommentLikeRepositoryPostgres');

describe('UserCommentLikeRepositoryPostgres', () => {
  afterEach(async () => {
    await UserCommentLikesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('likeComment function', () => {
    // it('should throw NotFoundError when thread not found', async () => {
    //   const payload = new LikeUnlike({
    //     threadId: 'thread-123',
    //     commentId: 'comment-123',
    //     userId: 'user-123',
    //   });

    //   const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
    //     pool,
    //     () => { },
    //   );

    //   await expect(userCommentLikeRepositoryPostgres.unlikeComment(payload))
    //     .rejects.toThrowError(NotFoundError);
    // });

    // it('should throw NotFoundError when comment not found', async () => {
    //   await ThreadsTableTestHelper.addThread({
    //     id: 'thread-123',
    //   });

    //   const payload = new LikeUnlike({
    //     threadId: 'thread-123',
    //     commentId: 'comment-123',
    //     userId: 'user-123',
    //   });

    //   const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
    //     pool,
    //     () => { },
    //   );

    //   await expect(userCommentLikeRepositoryPostgres.unlikeComment(payload))
    //     .rejects.toThrowError(NotFoundError);
    // });

    // it('should not throw NotFoundError when valid thread and comment given', async () => {
    //   const payload = new LikeUnlike({
    //     threadId: 'thread-123',
    //     commentId: 'comment-123',
    //     userId: 'user-123',
    //   });

    //   await ThreadsTableTestHelper.addThread({
    //     id: 'thread-123',
    //   });
    //   await CommentsTableTestHelper.addComment({
    //     id: 'comment-123',
    //   });

    //   const fakeIdGenerator = () => '123';
    //   const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
    //     pool,
    //     fakeIdGenerator,
    //   );

    //   await expect(userCommentLikeRepositoryPostgres.likeComment(payload))
    //     .resolves.not.toThrowError(NotFoundError);
    // });

    it('should persist add like', async () => {
      const payload = new LikeUnlike({
        threadId: 'thread-123',
        commentId: 'comment-123',
        userId: 'user-123',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
      });

      const fakeIdGenerator = () => '123';
      const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      await userCommentLikeRepositoryPostgres.likeComment(payload);

      const like = await UserCommentLikesTableTestHelper.findById('like-123');
      expect(like).toHaveLength(1);
    });
  });

  describe('unlikeComment function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      const payload = new LikeUnlike({
        threadId: 'thread-123',
        commentId: 'comment-123',
        userId: 'user-123',
      });

      const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
        pool,
        () => { },
      );

      await expect(userCommentLikeRepositoryPostgres.unlikeComment(payload))
        .rejects.toThrowError(NotFoundError);
    });

    // it('should throw NotFoundError when comment not found', async () => {
    //   await ThreadsTableTestHelper.addThread({
    //     id: 'thread-123',
    //   });

    //   const payload = new LikeUnlike({
    //     threadId: 'thread-123',
    //     commentId: 'comment-123',
    //     userId: 'user-123',
    //   });

    //   const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
    //     pool,
    //     () => { },
    //   );

    //   await expect(userCommentLikeRepositoryPostgres.unlikeComment(payload))
    //     .rejects.toThrowError(NotFoundError);
    // });

    // it('should not throw NotFoundError when valid thread and comment given', async () => {
    //   const payload = new LikeUnlike({
    //     threadId: 'thread-123',
    //     commentId: 'comment-123',
    //     userId: 'user-123',
    //   });

    //   await ThreadsTableTestHelper.addThread({
    //     id: 'thread-123',
    //   });
    //   await CommentsTableTestHelper.addComment({
    //     id: 'comment-123',
    //   });
    //   await UserCommentLikesTableTestHelper.addLike({
    //     id: 'like-123',
    //     commentId: 'comment-123',
    //     userId: 'user-123',
    //   });

    //   const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
    //     pool,
    //     () => { },
    //   );

    //   await expect(userCommentLikeRepositoryPostgres.unlikeComment(payload))
    //     .resolves.not.toThrowError(NotFoundError);
    // });

    it('should remove like', async () => {
      const payload = new LikeUnlike({
        threadId: 'thread-123',
        commentId: 'comment-123',
        userId: 'user-123',
      });

      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
      });
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
      });
      await UserCommentLikesTableTestHelper.addLike({
        id: 'like-123',
        commentId: 'comment-123',
        userId: 'user-123',
      });

      const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
        pool,
        () => { },
      );

      await userCommentLikeRepositoryPostgres.unlikeComment(payload);

      const like = await UserCommentLikesTableTestHelper.findById('like-123');
      expect(like).toHaveLength(0);
    });
  });

  describe('checkLikeExistence function', () => {
    it('should return 0 if not exists', async () => {
      const payload = new LikeUnlike({
        threadId: 'thread-123',
        commentId: 'comment-123',
        userId: 'user-123',
      });

      const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
        pool,
        () => { },
      );

      const isExists = await userCommentLikeRepositoryPostgres.checkLikeExistence(payload);
      expect(isExists).toEqual(0);
    });

    it('should return 1 if exists', async () => {
      const payload = new LikeUnlike({
        threadId: 'thread-123',
        commentId: 'comment-123',
        userId: 'user-123',
      });

      await UserCommentLikesTableTestHelper.addLike({
        id: 'reply-123',
        userId: 'user-123',
        commentId: 'comment-123',
      });

      const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(
        pool,
        () => { },
      );

      const isExists = await userCommentLikeRepositoryPostgres.checkLikeExistence(payload);
      expect(isExists).toEqual(1);
    });
  });

  describe('getCommentLikesCount function', () => {
    it('should return comment likes count', async () => {
      // Arrange
      const userCommentLikeRepositoryPostgres = new UserCommentLikeRepositoryPostgres(pool, {});

      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'thread title',
        body: 'thread body',
        owner: 'user-123',
      });

      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'a comment',
        owner: 'user-123',
        threadId: 'thread-123',
        createdAt: 'createdAt',
      });

      await UserCommentLikesTableTestHelper.addLike({
        id: 'like-123',
        user: 'user-123',
        commentId: 'comment-123',
      });

      await UserCommentLikesTableTestHelper.addLike({
        id: 'like-456',
        user: 'user-456',
        commentId: 'comment-123',
      });

      // Action
      const likeCount = await userCommentLikeRepositoryPostgres.getCommentLikesCount('comment-123');

      // Assert
      expect(likeCount).toEqual(2);
    });
  });
});
