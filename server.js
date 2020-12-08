const express = require("express");
var { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const db = require("./db");
const schema = require("./graphql/schema");
const root = require("./graphql/resolvers/index");
const path = require("path");
const app = express();

app.use(cors());
// Construct a schema, using GraphQL schema language

// The root provides a resolver function for each API endpoint
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }))
);

// Wrap the Express server
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("server is listening...");
});
