var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send({ msg: "hello" });
});

module.exports = router;
