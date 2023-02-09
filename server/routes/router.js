const express = require("express");
const Router = express.Router();
const AuthController = require("../Controller/AuthController");

Router.get("/", (req, res) => res.send("hello"));

//  Auth Controller

Router.post("/api/auth/register", AuthController.register);
Router.post("/api/auth/login", AuthController.login);

module.exports = Router;
