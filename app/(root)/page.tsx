import FetchPosts from "@/components/FetchPosts";
import { HomePageNav } from "@/components/navigation/HomePageNav";
import { SidePanel } from "@/components/navigation/SidePanel";
import Tags from "@/components/Tags";

export default async function Home() {
  return (
    <>
      <div className="flex max-md:ml-0">
        <SidePanel className="w-[400px] max-md:hidden h-[calc(100vh-70px)] bg-primary sticky top-[70px] left-0 overflow-y-auto" />

        <div className="flex flex-col w-full mx-10">
          <HomePageNav className="flex justify-center" />

          <div className="my-3 max-xl:overflow-x-auto max-md:mx-7">
            <Tags className="max-h-[95px] overflow-y-hidden" />
          </div>

          <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-6 auto-rows-auto mt-10 mr-7 max-md:mx-7">
            <FetchPosts />
          </div>
        </div>
      </div>
    </>
  );
}
