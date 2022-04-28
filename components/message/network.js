const express = require("express");
const response = require("../../network/response.js");
const { addMessage, getMessages } = require("./controller");

const app = express();

app.get("/", async (req, res) => {
  const filterByMessage = req.query.Message || null;
  res.header({
    "custom-headers": "valor personalizado",
  });

  try {
    const messageList = await getMessages(filterByMessage);
    response.success(req, res, messageList);
  } catch (err) {
    response.error(req, res, "unexpected error", 500, err);
  }
});
app.post("/", async (req, res) => {
  try {
    const fullMessage = await addMessage(req.body.user, req.body.message);
    response.success(req, res, fullMessage, 201);
  } catch (err) {
    response.error(req, res, err, 400, "error en post");
  }
});

module.exports = app;
