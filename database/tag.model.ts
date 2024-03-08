import { Schema, model, Document, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  questions: Schema.Types.ObjectId[];
  description: string;
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const tagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [
    { type: Schema.Types.ObjectId, ref: "Question" },
  ],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model("Tag", tagSchema);

export default Tag;
