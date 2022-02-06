var express = require("express");
var router = express.Router();
var Joi = require("joi");
const { CreactComment, GetComments } = require("../modules/DB");

const postShema = Joi.object({
  contenu: Joi.string().min(2).required(),
  author: Joi.string().min(2).required(),
  postId: Joi.string().min(3).required(),
});
var getShema = Joi.object({
  postId: Joi.string().min(3).required(),
}).required();

/* Post a new Comment. */
router.post("/", postValidator, function (req, res) {
  CreactComment(req.body)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).send(err));
});

/* Get Comments of a Post. */
router.get("/", getValidator, function (req, res) {
  GetComments(req.query)
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
