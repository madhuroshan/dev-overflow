"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shares.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { author, question, content, path } = params;

    const newAnswer = await Answer.create({
      author,
      question,
      content,
    });

    console.log({ newAnswer });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // Add reputation to author

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;
    console.log({ questionId });
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
  }
}
