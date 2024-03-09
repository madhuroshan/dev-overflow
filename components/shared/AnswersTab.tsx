import { getUserAnswers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result?.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
          clerkId={clerkId}
        />
      ))}
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result?.isNext || false}
      />
    </>
  );
};

export default AnswersTab;
