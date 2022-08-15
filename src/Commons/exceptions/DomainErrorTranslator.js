const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR':
    new InvariantError('tidak dapat membuat user baru karena karatker username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER':
    new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat entity new auth karena properti yang dibutuhkan tidak ada'),
  'NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat entity new auth karena tipe data tidak sesuai'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('username dan password harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
  'UPDATE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'UPDATE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
  'NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat thread karena properti yang dibutuhkan tidak ada'),
  'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat thread karena tipe data tidak sesuai'),
  'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat comment karena properti yang dibutuhkan tidak ada'),
  'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat comment karena tipe data tidak sesuai'),
  'NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat reply karena properti yang dibutuhkan tidak ada'),
  'NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat reply karena tipe data tidak sesuai'),
  'LIKE_UNLIKE.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat like/unlike payload karena properti yang dibutuhkan tidak ada'),
  'LIKE_UNLIKE.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat like/unlike payload karena tipe data tidak sesuai'),
  'GET_COMMENT_LIKES_COUNT.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat get comment likes count payload karena properti yang dibutuhkan tidak ada'),
  'GET_COMMENT_LIKES_COUNT.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat get comment likes count payload karena tipe data tidak sesuai'),
};

module.exports = DomainErrorTranslator;
