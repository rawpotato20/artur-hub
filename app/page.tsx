import ContentCard from "@/components/ContentCard";
import { HomePageNav } from "@/components/navigation/HomePageNav";
import { SidePanel } from "@/components/navigation/SidePanel";
import TagCard from "@/components/TagCard";
import Tags from "@/components/Tags";

export default function Home() {
  return (
    <>
      <div className="flex ml-[300px]">
        <SidePanel />
        <HomePageNav />
      </div>

      <div className="flex ml-[325px] my-3">
        <Tags />
      </div>

      <div className="flex ml-[325px] mt-10">
        <ContentCard />
      </div>
    </>
  );
}
