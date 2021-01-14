import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
    },
    office: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

employeeSchema.plugin(paginate);
export default model("Employee", employeeSchema);
