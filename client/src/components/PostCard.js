import React, { useContext } from "react";
import { Card, Icon, Button, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import MyPopup from "../utils/MyPopup";
import { AuthContext } from "../utils/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function PostCard({
  post: { body, createdAt, username, _id, likes, comments },
}) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${_id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra></Card.Content>
        <div style={{ margin: "20px" }}>
          <LikeButton post={_id} likeCount={likes?.length} likes={likes} />
          <MyPopup content="Comment on post">
            <Button labelPosition="right" as={Link} to={`/posts/${_id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {comments?.length}
              </Label>
            </Button>
          </MyPopup>
        </div>
      </Card>
    </div>
  );
}

export default PostCard;
