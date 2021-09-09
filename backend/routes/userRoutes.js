const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const User = require("../model/userModel");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/search").get(async (req, res) => {

  try {
  const users = await User.find({
    $or:[
      {name:{
        $in:req.query.hint.trim().split(' ').map((h)=>new RegExp('.*' + h + '.*'))
      } },
      {surname:{
        $in:req.query.hint.trim().split(' ').map((h)=>new RegExp('.*' + h + '.*'))
      } },
    ]
  });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.route("/").get(async (req, res) => {
  const userId = req.query._id;
  try {
    const user = await User.findById(userId);
    const { gender, isAdmin, password, birthday, ...other } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/login").post(authUser);
router.route("/profile").post(updateUserProfile);
module.exports = router;
