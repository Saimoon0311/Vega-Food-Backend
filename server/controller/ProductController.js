const Hotalsdb = require("../model/HotalsSchema");
const Productdb = require("../model/ProductSchema");

exports.createProducts = async (req, res) => {
  if (req.body == null || req.body == undefined) {
    return res
      .status(400)
      .send({ data: "Pleaase provide data to create product!" });
  }
  try {
    const {
      title,
      description,
      coverPicture,
      price,
      discountedPercentage,
      isDiscounted,
      topping,
      phoneNunber,
      city,
    } = req.body;
    var token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    const getHotal = await Hotalsdb.findOne({ token });
    if (!getHotal) {
      return res.status(400).send({ data: "Hotal not found!" });
    }
    const productData = {
      title,
      description,
      coverPicture,
      price,
      discountedPercentage,
      isDiscounted,
      topping,
      hotalID: getHotal._id,
      phoneNunber,
      city,
    };
    const products = await Hotalsdb(productData);
    const saveProduct = await products.save(products);
    res.status(200).send({ data: saveProduct });
  } catch (error) {
    res.status(400).send({ data: error });
  }
};
