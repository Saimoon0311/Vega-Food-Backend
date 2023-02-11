const Categorydb = require("../model/CategorySchema");

//   Create category

exports.createCategory = async (req, res) => {
  try {
    const category = await Categorydb({
      name: req.body.name,
    });
    const data = await category.save(category);
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ data: error });
  }
};

//   Get All Category

exports.getAllCategory = async (req, res) => {
  try {
    const allData = await Categorydb.find({});
    res.status(200).send({ data: allData });
  } catch (error) {
    res.status(400).send({ data: error });
  }
};
