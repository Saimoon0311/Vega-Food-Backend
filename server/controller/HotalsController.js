const Hotalsdb = require("../model/HotalsSchema");
const HotalOwnerdb = require("../model/HotalOwnerSchema");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const bcrypt = require("bcrypt");
const Categorydb = require("../model/CategorySchema");

//   Create category

exports.createHotals = async (req, res) => {
  if (req.body == null || req.body == undefined) {
    return res
      .status(400)
      .send({ data: "Pleaase provide data to create hotal!" });
  }
  try {
    const {
      name,
      email,
      contactNumber,
      profilePicture,
      city,
      coordinates,
      categories,
      about,
      active,
      timing,
      days,
      gallery,
      specialItem,
      twitter,
      facebook,
      password,
    } = req.body;
    var token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    const getOwner = await HotalOwnerdb.findOne({ token: token });
    if (!getOwner) {
      return res.status(400).send({ data: "User not found!" });
    }

    const getCategories = await Promise.all(
      categories.map((res) => Categorydb.findById({ _id: res }))
    );
    const hashPassword = await bcrypt.hash(password, 10);

    const hotals = {
      name,
      email,
      contactNumber,
      profilePicture:
        profilePicture ||
        "https://cloudinary.com/console/c-a630c22c84a30b44806ea404d610d4/media_library/folders/bf8db639310912666fa0fba9dffef21769/asset/d76f0d5ca48e8fecaf9fababc529a2e1/manage",
      city,
      coordinates,
      categories: getCategories,
      about,
      active,
      timing,
      days,
      gallery:
        gallery ||
        "https://cloudinary.com/console/c-a630c22c84a30b44806ea404d610d4/media_library/folders/bf8db639310912666fa0fba9dffef21769/asset/d76f0d5ca48e8fecaf9fababc529a2e1/manage",
      hotalOwnerID: getOwner._id,
      specialItem,
      twitter,
      facebook,
      token,
      password: hashPassword,
    };
    const jwtToken = jwt.sign({ hotals: hotals }, secretKey);
    const hotal = await Hotalsdb({ ...hotals, token: jwtToken });
    const hotalData = await hotal.save(hotal);
    res.status(200).send({ data: hotalData });
  } catch (error) {
    res.status(404).send({ data: error });
  }
};

//  Login Hotal

exports.loginHotal = async (req, res) => {
  if (req.body == null || req.body == undefined) {
    res.status(400).send({ data: "Please Complete All Information" });
    return req;
  }
  const { email, password } = req.body;
  try {
    var existUser = await Hotalsdb.findOne({ email: email });
    if (!existUser) return res.status(400).send({ data: "User Not Found" });
    const matchPassword = await bcrypt.compare(password, existUser.password);
    if (!matchPassword)
      return res.status(400).send({ data: "Password Not Match" });
    const token = jwt.sign({ email, id: existUser._id }, secretKey);
    await existUser.updateOne({
      $set: { token: token },
    });
    existUser = await Hotalsdb.findOne({ email: email });
    res.status(200).send({ data: existUser });
  } catch (error) {
    res.status(400).send({ data: error });
  }
};
