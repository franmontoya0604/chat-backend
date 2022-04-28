const express = require("express");
const response = require("../../network/response.js");
const { addUser, getUsers } = require("./controller");

const app = express();

app.get("/", async (req, res) => {
  res.header({
    "custom-headers": "valor personalizado",
  });

  try {
    const data = await getUsers();
    response.success(req, res, data, 200);
  } catch (err) {
    response.error(req, res, "unexcpected error", 500, err);
  }
});
app.post("/", async (req, res) => {
  try {
    const data = await addUser(req.body.name);
    response.success(req, res, data._id, 201);
  } catch (err) {
    response.error(req, res, "internal error", 500, err);
  }
});

module.exports = app;
