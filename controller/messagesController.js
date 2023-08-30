const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");

exports.messagesMain = (req, res, next) => {
  res.render("messagesMain", {
    title: "Messages",
    user: req.user,
  });
};

exports.messagesBoard = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({}).populate("author").sort({ date: 1 });

  res.render("messagesBoard", {
    title: "Message board",
    messages: messages,
    user: res.locals.currentUser,
  });
});

exports.messagesNewGet = (req, res, next) => {
  let user = res.locals.currentUser;
  res.render("messagesNew", {
    title: "New message",
    user: res.locals.currentUser,
  });
};

exports.messagesNewPost = asyncHandler(async (req, res, next) => {
  let message = new Message({
    text: req.body.text,
    author: req.user._id,
    date: new Date(),
  });

  if (!message) {
    const err = new Error("Message not created");
    err.status = 404;
    return next(err);
  }

  const result = await message.save();
  if (result) {
    console.log(req.user);
    console.log("Message successfully sent");
  }
  res.redirect("/messages");
});
