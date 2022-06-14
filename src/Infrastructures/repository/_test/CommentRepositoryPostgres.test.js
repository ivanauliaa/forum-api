const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist add comment', async () => {
      const newComment = new NewComment({
        content: 'a comment',
        owner: 'user-123',
        threadId: 'thread-123',
      });

      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await commentRepositoryPostgres.addComment(newComment);

      const comment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
    });

    it('should return added comment correctly', async () => {
      const newComment = new NewComment({
        content: 'a comment',
        owner: 'user-123',
        threadId: 'thread-123',
      });

      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      const addedComment = await commentRepositoryPostgres.addComment(newComment);

      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: newComment.content,
        owner: newComment.owner,
      }));
    });
  });

  describe('deleteCommentById function', () => {
    it('should throw NotFoundError when id not found', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => { });

      await expect(commentRepositoryPostgres.deleteCommentById('comment-123'))
        .rejects.toThrowError(NotFoundError);
    });

    it('should update deleted_at column to deleted datetime', async () => {
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'a comment',
        owner: 'user-123',
        threadId: 'thread-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => { });
      await commentRepositoryPostgres.deleteCommentById('comment-123');

      const deletedComment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(deletedComment[0].deleted_at).not.toBeNull();
    });
  });

  describe('verifyCommentOwner function', () => {
    it('should throw NotFoundError when comment not found', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => { });

      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-123'))
        .rejects.toThrowError(NotFoundError);
    });

    it('should throw AuthorizationError when owner unauthorized', async () => {
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'a comment',
        owner: 'user-123',
        threadId: 'thread-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => { });

      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'unauthorized-user'))
        .rejects.toThrowError(AuthorizationError);
    });

    it('should not throw error when owner authorized', async () => {
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'a comment',
        owner: 'user-123',
        threadId: 'thread-123',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => { });

      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-123'))
        .resolves.not.toThrowError(AuthorizationError);
    });
  });
});