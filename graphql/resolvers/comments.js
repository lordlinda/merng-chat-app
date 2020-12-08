const Post = require("../..//models/Post");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  createComment: async ({ postId, body }, req) => {
    const user = checkAuth(req);
    if (body.trim() === "") {
      throw new Error("Empty comment");
    }
    const post = await Post.findById(postId);
    if (post) {
      post.comments.unshift({
        body,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      await post.save();
      return post;
    } else {
      throw new Error("Post not found");
    }
  },
  deleteComment: async ({ postId, commentId }, req) => {
    const { username } = checkAuth(req);
    const post = await Post.findById(postId);

    if (post) {
      const commentIndex = post.comments.findIndex((c) => c.id === commentId);
      if (post.comments[commentIndex].username === username) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        return post;
      } else {
        throw new Error("Action not allowed");
      }
    } else {
      throw new Error("user not found");
    }
  },
  likePost: async ({ postId }, req) => {
    const { username } = checkAuth(req);
    const post = await Post.findById(postId);
    if (post) {
      if (post.likes.find((like) => like.username === username)) {
        post.likes = post.likes.filter((like) => like.username !== username);
      } else {
        post.likes.push({
          username,
          createdAt: new Date().toISOString(),
        });
      }
      await post.save();
      return post;
    } else throw new Error("post not found");
  },
};
