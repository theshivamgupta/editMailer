const User = require("../model/user");
const Template = require("../model/template");

exports.createTemplate = (req, res) => {
  console.log("params ", req.body.id);
  const newTemplate = Template({ htmlContent: req.body.htmlContent });
  newTemplate.save((err, template) => {
    if (err || !template) {
      return res.status(400).json({
        error: "Template not saved!",
      });
    }
    console.log(template._id);
    User.findById(req.body.id, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "user not found",
        });
      }
      user.templates.push(template._id);
      user.save();
      const userObj = { _id: user._id, templates: user.templates };
      return res.json({ template, userObj });
    });
    // console.log("user", user);
  });
};

exports.getTemplateById = (req, res) => {
  Template.findOne({ _id: req.params.id }).exec((err, template) => {
    if (err || !template) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json(template);
  });
};

exports.updateTemplateById = (req, res) => {
  Template.findByIdAndUpdate(req.body.id, {
    htmlContent: req.body.htmlContent,
  }).exec((err, template) => {
    if (err || !template) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json(template);
  });
};
