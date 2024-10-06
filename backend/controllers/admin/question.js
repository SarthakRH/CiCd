const Question = require("../../models/Question");
const Category = require("../../models/Category");
const mongoose = require("mongoose");

const addQuestion = async (req, res) => {
  console.log(req.body)
  const { question, id } = req.body;
  const categoryId = mongoose.Types.ObjectId(id);
  const newQ = await Question.create({
    question:question.trim(),
    categoryId,
  });
  if (newQ) {
    res.status(201).json({ ...newQ });
  } else res.status(400).json({ msg: "Something went wrong" });
};

const getQuestionsOfACategory = async (req, res) => {
  const catId = req.params.catId;
  const cat = await Category.findById(catId).lean();
  if (cat) {
    const questions = await Question.find({
      categoryId: mongoose.Types.ObjectId(catId),
    }).lean();
    if (questions) res.status(200).json({ questions, category:cat.name });
  } else res.status(404).json({ msg: "Category doesnot exist" });
};

const deleteQuestion = async (req, res) => {
  const { qId } = req.params;
  const question = await Question.findByIdAndDelete(qId).lean();
  if (question) res.status(200).json({ ...question});
  else res.status(400).json({ msg: "Question doesnot exist" });
};

module.exports = { addQuestion, getQuestionsOfACategory, deleteQuestion };
