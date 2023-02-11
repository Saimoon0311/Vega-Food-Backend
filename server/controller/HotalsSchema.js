const Hotalsdb = require("../model/HotalsSchema");

//   Create category

exports.createHotals = async (req, res) => {
  if (!req.body)
    return res
      .status(400)
      .send({ data: "Pleaase provide data to create hotal!" });
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
    hotalOwnerID,
    specialItem,
    twitter,
    facebook,
  } = req.body;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      console.log("token", req.headers.authorization.split(" ")[1]);
    }
    // const category = await Categorydb({
    //   name: req.body.name,
    // });
    // const data = await category.save(category);
    res.status(200).send({ data: req.headers.authorization.split(" ")[1] });
  } catch (error) {
    res.status(400).send({ data: error });
  }
};
