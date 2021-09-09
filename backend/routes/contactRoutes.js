const express = require("express");
const {CreateMessage } = require("../controllers/contactControllers");

const router = express.Router();

router.route('/').post(CreateMessage);
module.exports = router;