import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title:
      "How to use React Query? and How to start doing it?",
    tags: [
      {
        _id: "1",
        name: "React Query",
      },
      {
        _id: "2",
        name: "React",
      },
      {
        _id: "3",
        name: "JavaScript",
      },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      picture: "/assets/icons/avatar.svg",
    },
    upvotes: 1034544,
    views: 10099,
    answers: [],
    createdAt: new Date("2021-09-20T12:30:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      {
        _id: "1",
        name: "Css",
      },
      {
        _id: "2",
        name: "flex",
      },
    ],
    author: {
      _id: 2,
      name: "Jonas",
      picture: "/assets/icons/avatar.svg",
    },
    upvotes: 14,
    views: 200,
    answers: [],
    createdAt: new Date("2021-09-20T12:30:00.000Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          All Questions
        </h1>
        <Link
          href="/ask-question"
          className="flex justify-end max-sm:w-full"
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex items-center justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          route="/"
          iconPostion="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          className="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResults
            title="There are no questions to show"
            description="Be the first to break the silence 🚀, Ask a Question
          and start the discussion.Your query could be the
          next big thing others could learn. Get Involved!"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  );
}
