import Link from "next/link";
import React from "react";
import RenderTags from "../shared/RenderTags";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";
interface QuestionCardProps {
  _id: string;
  title: string;
  tags:
    | {
        _id: string;
        name: string;
      }[];
  author: {
    _id: number;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<Object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionCardProps) => {
  const showActionButtons = clerkId && clerkId === author?.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {`asked ${getTimeStamp(createdAt)}`}
          </span>
          <Link href={`/question/${_id}`}>
            <h3
              className="sm:h3-semibold base-semibold
            text-dark200_light900 line-clamp-1 flex-1"
            >
              {title}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTags key={tag.name} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          value={author.name}
          title={`| asked ${getTimeStamp(createdAt)}`}
          alt="upvote"
          href={`/profile/${author._id}`}
          textStyles="text-dark400_light700 body-medium"
        />
        <Metric
          imgUrl="/assets/icons/upvote.svg"
          value={formatNumber(upvotes.length)}
          title=" Votes"
          alt="upvote"
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          value={formatNumber(views)}
          title=" Views"
          alt="likes"
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          value={formatNumber(answers.length)}
          title=" Answers"
          alt="upvote"
          textStyles="text-dark400_light800 small-medium"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
