import mongoose from "mongoose";

const taskSchema =
new mongoose.Schema(

{
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    required: true,
    enum: [
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL"
    ]
  },

  status: {
    type: String,
    required: true,
    default: "OPEN",
    enum: [
      "OPEN",
      "IN_PROGRESS",
      "RESOLVED",
      "CLOSED"
    ]
  },

  createdBy: {
    type: Number,
    required: true
  },

  updatedBy: {
    type: Number,
    default: null
  },

  deadline: {
    type: String,
    default: ""
  },

  assignedTo: {
    type: Number,
    default: null
  }

},

{
  timestamps: {
    createdAt: "createdat",
    updatedAt: "updatedat"
  }
}

);

const Tasks =
mongoose.model(
  "Tasks",
  taskSchema
);

export default Tasks;
