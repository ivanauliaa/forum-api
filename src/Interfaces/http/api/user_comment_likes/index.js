const UserCommentLikesHandler = require('./handler');
const routes = require('./routes');

const plugin = {
  name: 'user_comment_likes',
  register: async (server, { container }) => {
    const userCommentLikesHandler = new UserCommentLikesHandler(container);
    server.route(routes(userCommentLikesHandler));
  },
};

module.exports = plugin;
