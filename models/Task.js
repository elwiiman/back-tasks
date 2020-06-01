const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
      require: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
