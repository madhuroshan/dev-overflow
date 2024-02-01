import { Schema, model, Document, models } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId; // ref to user
  action: string;
  question: Schema.Types.ObjectId; // ref to question
  answer: Schema.Types.ObjectId; // ref to answer
  tags: Schema.Types.ObjectId[]; // ref to tag
  createdAt: Date;
}

const interactionSchema = new Schema<IInteraction>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model("Interaction", interactionSchema);

export default Interaction;
