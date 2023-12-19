const { sectionModel } = require("../models/section.model");

const getAllSection = async (req, res) => {
  try {
    const data = await sectionModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unexpected thing occured",
      error: error.message,
    });
  }
};

const addSection = async (req, res) => {
  const { sectionId,section } = req.body;
  try {
    const Section = await sectionModel.findOne({ section }).exec();
    if (!Section) {
      const newSection = new sectionModel({
        sectionId,
        section,
      });   

      await newSection.save();
      return res
        .status(200)
        .json({ msg: "Section Added to sectionList", Section: newSection });
    }

    res.status(200).json({ success: true, msg: "Section already exist" });
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
};

module.exports = { getAllSection, addSection };
