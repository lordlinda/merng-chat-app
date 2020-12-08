import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../utils/auth";
import PostForm from "../components/PostForm";
function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Grid columns={1}>
        <Grid.Row>
          <h2 style={{ padding: "20px" }}>Recent Posts</h2>
        </Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Grid.Row>
          {!loading && data?.getPosts ? (
            data?.getPosts.map((post) => (
              <Grid.Column key={post._id} style={{ marginBotton: "20px" }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          ) : (
            <h1>loading..</h1>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      _id
      body
      username
      createdAt
      likes {
        _id
        createdAt
        username
      }
      comments {
        _id
        createdAt
        username
        body
      }
    }
  }
`;
export default Home;
