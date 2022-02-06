var express = require("express");
var router = express.Router();
var Joi = require("joi");
const {
  CreactFavourite,
  GetFavourites,
  DeleteFavourite,
} = require("../modules/DB");

const postShema = Joi.object({
  owner: Joi.string().min(3).required(),
  postId: Joi.string().min(3).required(),
});
var getShema = Joi.object({
  owner: Joi.string().min(2).required(),
}).required();

/* Add a new Favourite. */
router.post("/", postValidator, function (req, res) {
  CreactFavourite(req.body)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).send(err));
});

/* Delete a specific post from Favourite. */
router.delete("/", postValidator, function (req, res) {
  DeleteFavourite(req.body)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).send(err));
});

/* Get Favourites of a User . */
router.get("/", getValidator, function (req, res) {
  GetFavourites(req.query)
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).send(err));
});

function postValidator(req, res, next) {
  const { error } = postShema.validate(req.body);
  if (error) res.status(501).send(error);
  else next();
}

function getValidator(req, res, next) {
  const { error } = getShema.validate(req.query);
  if (error) res.status(501).send(error);
  else next();
}

module.exports = router;
