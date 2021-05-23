const User = require("../model/user");

exports.findByEmail = (email, fn) => {
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return fn(null, null);
    }
    return fn(null, user);
  });
};

exports.getUserTemplates = (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("templates")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json(user);
    });
};
