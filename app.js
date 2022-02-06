const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const Keycloak = require("keycloak-connect");

//Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postRouter = require("./routes/post");
var commentRouter = require("./routes/comment");
var favouriteRouter = require("./routes/favourite");

const memoryStore = new session.MemoryStore();

var app = express();

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

const keycloak = new Keycloak({
  store: memoryStore,
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(keycloak.middleware());

app.use("/", keycloak.checkSso(), indexRouter);
app.use("/users", keycloak.checkSso(), usersRouter);
app.use("/post", keycloak.checkSso(), postRouter);
app.use("/comment", keycloak.checkSso(), commentRouter);
app.use("/favourite", keycloak.checkSso(), favouriteRouter);

app.listen(3001);

module.exports = app;
