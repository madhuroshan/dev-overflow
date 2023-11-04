import Link from "next/link";
import React from "react";
import Image from "next/image";
import RenderTags from "../RenderTags";
const RightSideBar = () => {
  const popularTags = [
    {
      _id: "1",
      title: "React",
      numQuestions: 10,
    },
    {
      _id: "2",
      title: "Javascript",
      numQuestions: 17,
    },
    {
      _id: "3",
      title: "Typescript",
      numQuestions: 5,
    },
    {
      _id: "4",
      title: "Next.js",
      numQuestions: 3,
    },
    {
      _id: "5",
      title: "React",
      numQuestions: 10,
    },
  ];
  const topQuestions = [
    {
      _id: "1",
      title: "How to create a new project?",
    },
    {
      _id: "2",
      title: "How to create a new project?",
    },
    {
      _id: "3",
      title: "How to create a new project?",
    },
    {
      _id: "4",
      title:
        "How to create a new project? with something new",
    },
    {
      _id: "5",
      title: "React is the best framework?",
    },
  ];
  return (
    <section
      className="background-light900_dark200 light-border lg:custom-scrollbar sticky right-0 top-0 
  flex h-screen  w-[350px] flex-col overflow-y-auto
  border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">
          Top Questions
        </h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="right arrow"
                height={20}
                width={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">
          Popular Tags
        </h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTags
              key={tag._id}
              _id={tag._id}
              name={tag.title}
              totalQuestions={tag.numQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
