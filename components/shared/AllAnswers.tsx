import React from "react";
import Filters from "./Filters";
import { AnswerFilters } from "@/constants/filter";
import { getAllAnswers } from "@/lib/actions/answer.actions";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";
import page from "@/app/(root)/(home)/page";
interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAllAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });
  return (
    <div className="mt-11 ">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filters filters={AnswerFilters} />
      </div>

      <div>
        {result?.answers.map((answer) => {
          return (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="flex items-center justify-between">
                <div className="mt-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={answer.author.picture}
                      width={20}
                      height={20}
                      alt="author"
                      className="rounded-full object-cover sm:mt-0.5"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="body-semibold text-dark300_light700 ">
                        {answer.author.name}{" "}
                      </p>
                      <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                        <span className="max-sm:hidden"> -</span>
                        answered {getTimeStamp(answer.createdAt)}
                      </p>
                    </div>
                  </Link>

                  <div className="flex justify-end">
                    <Votes
                      type="Answer"
                      itemId={JSON.stringify(answer._id)}
                      userId={JSON.stringify(userId)}
                      upvotes={answer.upvotes.length}
                      hasupVoted={answer.upvotes.includes(userId)}
                      downvotes={answer.downvotes.length}
                      hasdownVoted={answer.downvotes.includes(userId)}
                    />
                  </div>
                </div>
              </div>
              <ParseHTML data={answer.content} />
            </article>
          );
        })}
      </div>
      <Pagination
        pageNumber={page ? page : 1}
        isNext={result?.isNext || false}
      />
    </div>
  );
};

export default AllAnswers;
