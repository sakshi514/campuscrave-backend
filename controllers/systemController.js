const System = require("../models/System");

// GET announcement
exports.getSystem = async (req, res) => {
  let system = await System.findOne();

  if (!system) {
    system = await System.create({});
  }

  res.json(system);
};

// UPDATE announcement
exports.updateSystem = async (req, res) => {
  let system = await System.findOne();

  if (!system) {
    system = await System.create({});
  }

  system.announcement = req.body.announcement;

  await system.save();

  res.json(system);
};




