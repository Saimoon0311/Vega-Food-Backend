const Userdb = require("../model/UserSchema");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  if (req.body == null || req.body == undefined) {
    res.status(400).send({ data: "Please Complete All Information" });
    return req;
  }
  const { email, password, providerId } = req.body;
  console.log("boy", res.body);
  try {
    var existUser = await Userdb.findOne({ email: email });
    if (
      (providerId == "facebook.com" || providerId == "google.com") &&
      existUser
    ) {
      const token = jwt.sign({ email, id: existUser._id }, secretKey);
      await existUser.updateOne({
        $set: { token: token },
      });
      existUser = await Userdb.findOne({ email: email });
      res.status(200).send({ data: existUser });
    }
    if (!existUser) return res.status(400).send({ data: "User Not Found" });
    const matchPassword = await bcrypt.compare(password, existUser.password);
    if (!matchPassword)
      return res.status(400).send({ data: "Password Not Match" });
    const token = jwt.sign({ email, id: existUser._id }, secretKey);
    await existUser.updateOne({
      $set: { token: token },
    });
    existUser = await Userdb.findOne({ email: email });
    res.status(200).send({ data: existUser });
  } catch (error) {
    res.status(400).send({ data: error });
  }
};

exports.register = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ data: "Please Complete All Information" });
    return req;
  }
  const {
    name,
    email,
    city,
    loginType,
    phoneNunber,
    profilePicture,
    password,
  } = req.body;
  try {
    const existUser = await Userdb.findOne({ email: email });
    if (existUser) return res.status(401).send({ data: "User Already Exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = {
      name: name,
      email: email,
      city: city,
      loginType: loginType,
      phoneNunber: phoneNunber,
      profilePicture:
        profilePicture ||
        "https://cloudinary.com/console/c-a630c22c84a30b44806ea404d610d4/media_library/folders/bf8db639310912666fa0fba9dffef21769/asset/d76f0d5ca48e8fecaf9fababc529a2e1/manage",
      status: 0,
      password: hashPassword,
    };

    const token = jwt.sign({ user: user }, secretKey);
    const users = new Userdb({
      ...user,
      token,
    });
    const userData = await users.save(users);
    res.status(200).send({ data: userData });
  } catch (error) {
    res.status(400).send({ data: error });
  }
};
