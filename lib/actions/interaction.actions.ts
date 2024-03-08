"use server";

import { ViewQuestionParams } from "./shares.types";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();
    const { userId, questionId } = params;

    // update view count

    if (userId) {
      // create interaction
      const existingInteraction = await Interaction.findOne({
        user: userId,
        question: questionId,
        action: "view",
      });

      await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
      if (existingInteraction) {
        return;
      }

      await Interaction.create({
        user: userId,
        question: questionId,
        action: "view",
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
