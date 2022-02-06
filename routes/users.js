var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send({ msg: "hello from user" });
});

module.exports = router;
