const Post = require("../..//models/Post");
const checkAuth = require("../../utils/checkAuth");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

module.exports = {
  getPosts: async () => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      return posts;
    } catch (err) {
      throw new Error(err);
    }
  },
  getPost: async ({ postId }) => {
    try {
      const post = await Post.findById(postId);
      if (post) {
        return post;
      } else {
        throw new Error("Post not found");
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  createPost: async ({ body }, request) => {
    const user = checkAuth(request);
    const newPost = new Post({
      body,
      user: user.id,
      username: user.username,
      createdAt: new Date().toISOString(),
    });
    const post = await newPost.save();
    pubsub.publish("NEW_POST", {
      newPost: post,
    });
    return post;
  },
  deletePost: async ({ postId }, req) => {
    const user = checkAuth(req);
    try {
      const post = await Post.findById(postId);
      if (user.username === post.username) {
        await post.delete();
        return "Post deleted successfully";
      } else {
        throw new Error("not deleted");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  newPost: {
    subscribe: () => pubsub.asyncIterator("NEW_POST"),
  },
};
