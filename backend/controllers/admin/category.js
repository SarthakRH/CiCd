const Category = require("../../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json([...categories]);
};

const addCategory = async (req, res) => {
  let { name } = req.body;
  console.log(name)
    name = name.toLowerCase();
  const cat = await Category.findOne({ name });
  if (cat) {
    res.status(400).json({ msg: "Category already exists" });
  } else {
    const newCat = await Category.create({
      name,
    })
    res.status(201).json({ ...newCat._doc})
  }
};
const getSingleCategory = async (req, res) => {
  const id = req.params.id;
  const cat = await Category.findById(id).lean()
  if (cat) res.status(200).json({ ...cat })
  else {
    res.status(404).json({ msg: "Category doesn't exist" })
  }
};
const deleteCategory = async (req, res) => {
    // TODO - delete all questions belonging to that category
  const id = req.params.id;
  const cat = await Category.findByIdAndDelete(id).lean();
  if (cat) res.status(200).json({ ...cat });
  else {
    res.status(404).json({ msg: "Category doesn't exist" });
  }
};

module.exports = {
  getCategories,
  addCategory,
  getSingleCategory,
  deleteCategory,
};
