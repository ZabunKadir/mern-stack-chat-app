const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");
const CreateMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const text = new Contact({ name, email, message });

    const createdMessage = await text.save();

    res.status(201).json(createdMessage);
  }
});
module.exports = { CreateMessage};