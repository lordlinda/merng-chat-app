const postsResolver = require("./posts");
const userResolver = require("./users");
const commentResolver = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent) => {
      console.log(parent);
      return parent.likes.length;
    },
    commentCount: (parent) => {
      return parent.comments.length;
    },
  },
  ...postsResolver,
  ...userResolver,
  ...commentResolver,
};
