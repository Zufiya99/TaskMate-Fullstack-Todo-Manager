import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, //This option automatically adds "createdAt" and "updatedAt" fields to the schema, which are managed by Mongoose.
  }
);
const TodoModel = mongoose.models.todo || mongoose.model("todo", Schema);

export default TodoModel;