const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  amount: { type: Number, required: true },
  ownerId: { type: String, required: true },
});

const Services = mongoose.model("Service", ServiceSchema);
module.exports = Services;
