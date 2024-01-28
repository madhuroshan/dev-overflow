import { getQuestionById } from "@/lib/actions/question.actions";
import Link from "next/link";
import Image from "next/image";

import React from "react";
import Metric from "@/components/shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTags from "@/components/shared/RenderTags";
import Answer from "@/components/forms/Answer";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

const Page = async ({ params, searchParams }) => {
  //   console.log(params);
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();
  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={result.author.picture}
              width={20}
              height={20}
              alt="author"
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes />
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          value={`asked ${getTimeStamp(result.createdAt)}`}
          title=""
          alt="clock"
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          value={formatNumber(result.views)}
          title=" Views"
          alt="likes"
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          value={formatNumber(result.answers.length)}
          title=" Answers"
          alt="upvote"
          textStyles="text-dark400_light800 small-medium"
        />
      </div>

      <ParseHTML data={result.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => {
          return (
            <RenderTags
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              showCount={false}
            />
          );
        })}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={result.answers.length}
      />
      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default Page;
