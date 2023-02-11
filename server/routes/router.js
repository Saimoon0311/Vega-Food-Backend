const express = require("express");
const Router = express.Router();
const AuthController = require("../Controller/AuthController");
const CategoryController = require("../Controller/CategoryController");
const HotalsSchema = require("../Controller/HotalsSchema");

Router.get("/", (req, res) => res.send("hello"));

//  Auth Controller

Router.post("/api/auth/register", AuthController.register);
Router.post("/api/auth/login", AuthController.login);

//   Category Controller

Router.post("/api/createCategory", CategoryController.createCategory);
Router.get("/api/getAllCat", CategoryController.getAllCategory);

// Hotal Controller

Router.post("/api/createHotals", HotalsSchema.createHotals);

module.exports = Router;
