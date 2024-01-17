const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workshopSchema = new Schema(
  {
    workshopDetails: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
  },
  { collection: "conductedworkshops" }
);

const ConductedWorkshop = mongoose.model("ConductedWorkshop", workshopSchema);

module.exports = ConductedWorkshop;
