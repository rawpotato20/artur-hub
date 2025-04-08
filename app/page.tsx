import { HomePageNav } from "@/components/navigation/HomePageNav";
import { SidePanel } from "@/components/SidePanel";
import TagCard from "@/components/TagCard";

export default function Home() {
  return (
    <>
      <div className="flex ml-[300px]">
        <SidePanel />
        <HomePageNav />
      </div>

      <div className="flex ml-[300px]">
        <TagCard tag="artur" />
      </div>
    </>
  );
}
