var express = require("express");
var router = express.Router();
var Joi = require("joi");
const { NewPost, GetPost, GetPostById } = require("../modules/elastic");

const postShema = Joi.object({
  titre: Joi.string().min(3).required(),
  contenu: Joi.string().min(5).required(),
  owner: Joi.string().min(3).required(),
  emplacement: {
    latitude: Joi.number().required(),
    langetude: Joi.number().required(),
  },
});
var getShema = Joi.object({
  contenu: Joi.string().min(1),
  latitude: Joi.number().required(),
  langetude: Joi.number().required(),
  page: Joi.number().required(),
}).required();

var getbyIdShema = Joi.object({
  _id: Joi.string().min(1),
}).required();

/* Post a new post. */
router.post("/", postValidator, function (req, res) {
  NewPost(req.body)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).send(err));
});

/* Search for posts. */
router.get("/", getValidator, function (req, res) {
  GetPost(req.query)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).send(err));
});

/* Search for posts. */
router.get("/id/", getByIdValidator, function (req, res) {
  GetPostById(req.query)
    .then((post) => res.status(200).json(post))
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

function getByIdValidator(req, res, next) {
  const { error } = getbyIdShema.validate(req.query);
  if (error) res.status(501).send(error);
  else next();
}

module.exports = router;
