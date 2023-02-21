const express = require("express");
const Router = express.Router();
const AuthController = require("../Controller/AuthController");
const CategoryController = require("../Controller/CategoryController");
const HotalsSchema = require("../controller/HotalsController");
const HotalOwnerSchema = require("../controller/HotalOwnerController");
const ProductSchema = require("../controller/ProductController");

Router.get("/", (req, res) => res.send("hello"));

//  Auth Controller

Router.post("/api/auth/register", AuthController.register);
Router.post("/api/auth/login", AuthController.login);

//  Hotal Owner Controller

Router.post(
  "/api/hotalOwner/register",
  HotalOwnerSchema.createHotalOwnerProfile
);
Router.post("/api/hotalOwner/login", HotalOwnerSchema.loginHotalOwner);

// Hotal Controller

Router.post("/api/createHotals", HotalsSchema.createHotals);
Router.post("/api/loginHotal", HotalsSchema.loginHotal);

//   Category Controller

Router.post("/api/createCategory", CategoryController.createCategory);
Router.get("/api/getAllCat", CategoryController.getAllCategory);

// Product Controller

Router.post("/api/Producct/createProduct", ProductSchema.createProducts);

module.exports = Router;
