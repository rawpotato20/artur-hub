import ContentCard from "@/components/ContentCard";
import { HomePageNav } from "@/components/navigation/HomePageNav";
import { SidePanel } from "@/components/navigation/SidePanel";
import Tags from "@/components/Tags";

const signedOut = false;

export default function Home() {
  return (
    <>
      <div className={`flex ${signedOut ? "ml-[50px]" : "ml-[300px]"}`}>
        <SidePanel className={signedOut ? "hidden" : ""} />
        <HomePageNav className="mx-7" />
      </div>

      <div className={`flex my-3 ${signedOut ? "ml-[75px]" : "ml-[325px]"}`}>
        <Tags />
      </div>

      <div className={`flex mt-10 ${signedOut ? "ml-[75px]" : "ml-[325px]"}`}>
        <ContentCard />
      </div>
    </>
  );
}
