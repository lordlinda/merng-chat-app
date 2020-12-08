import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      _id
      body
      createdAt
      username
    }
  }
`;
