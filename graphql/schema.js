const { buildSchema } = require("graphql");

module.exports = buildSchema(`
   type Post{
    _id:ID
    body:String!
    createdAt:String
    username:String!
    comments:[Comment]!
    likes:[Like]!
    commentCount:Int!
    likeCount:Int!
  }
  type Comment {
      _id:ID!
      createdAt:String!
      username:String! 
      body:String! 

  }
  type Like {
      _id:ID
      createdAt:String! 
      username:String! 

  }
  input RegisterInput{
      username:String!
      password:String!
      confirmPassword:String!
      email:String!
  }
  type User{
      _id:ID
      email:String!
      token:String!
      username:String!
      createdAt:String!
  }
  type Query {
    getPosts:[Post!]!
    getPost(postId:ID):Post
  }
  type Mutation {
      register(registerInput:RegisterInput):User!
      login(username:String!,password:String):User!
      createPost(body:String):Post!
      deletePost(postId:ID):String
      createComment(postId:String!,body:String!):Post
      deleteComment(postId:ID!,commentId:ID!):Post!
      likePost(postId:ID):Post!
  }
  type Subscription {
      newPost:Post!
  }

`);
