import Filters from "@/components/shared/Filters";
import NoResults from "@/components/shared/NoResults";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/constants/filter";
import { getAllTags } from "@/lib/actions/tag.actions";
import Link from "next/link";

import React from "react";

const Page = async () => {
  const results = await getAllTags({});
  // BUG FIXING PHASE
  //   console.log(results.tags);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">
        All Tags
      </h1>

      <div className="mt-11 flex items-center justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          route="/tags"
          iconPostion="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for some tags"
          className="w-full flex-1"
        />
        <Filters
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {results.tags.length > 0 ? (
          results.tags.map((tag) => {
            return (
              <Link
                href={`/tags/${tag._id}`}
                key={tag._id}
                className="shadow-light100_darknone"
              >
                <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                  <div className="background-light800_dark400 w-fit rounded-sm px-4  py-1.5 ">
                    <p className="paragraph-semibold text-dark300_light900">
                      {tag.name}
                    </p>
                  </div>

                  <p className="small-medium text-dark400_light500 mt-3.5">
                    <span className="body-semibold primary-text-gradient mr-2.5">
                      {tag.questions.length}+
                    </span>{" "}
                    Questions
                  </p>
                </article>
              </Link>
            );
          })
        ) : (
          <NoResults
            title="NO tags found"
            description="It looks like there are no tags "
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
    </>
  );
};

export default Page;
