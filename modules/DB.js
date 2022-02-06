const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/demo-Db");

const CommentSchema = new mongoose.Schema({
  contenu: String,
  author: String,
  postId: String,
});
const Comment = mongoose.model("Comment", CommentSchema);

const FavouriteSchema = new mongoose.Schema({
  owner: String,
  postId: String,
});

const Favourite = mongoose.model("Favourite", FavouriteSchema);

const CreactComment = async (props) => {
  const comment = new Comment(props);
  const result = await comment.save();
  return result;
};
const GetComments = async (props) => {
  const comments = await Comment.find(props);
  return comments;
};

const CreactFavourite = async (props) => {
  const favourite = new Favourite(props);
  const result = await favourite.save();
  return result;
};

const DeleteFavourite = async (props) => {
  const favourite = await Favourite.deleteOne(props);
  return favourite;
};

const GetFavourites = async (props) => {
  const favourites = await Favourite.find(props).select({
    owner: 1,
    postId: 1,
    _id: 0,
  });
  return favourites;
};

module.exports = {
  CreactComment: CreactComment,
  GetComments: GetComments,
  CreactFavourite: CreactFavourite,
  DeleteFavourite: DeleteFavourite,
  GetFavourites: GetFavourites,
};
