import UserCard from "@/components/cards/UserCard";
import Filters from "@/components/shared/Filters";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/constants/filter";
import { getAllUsers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex items-center justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          route="/community"
          iconPostion="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for some amazing minds"
          className="w-full flex-1"
        />
        <Filters
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => {
            return <UserCard key={user._id} user={user} />;
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>NO USERS YET </p>
            <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
              Join to be the first
            </Link>
          </div>
        )}
      </section>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
};

export default Page;
