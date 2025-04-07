import { HomePageNav } from "@/components/navigation/HomePageNav";
import { SidePanel } from "@/components/SidePanel";

export default function Home() {
  return (
    <>
      <div className="flex ml-[300px]">
        <SidePanel />
        <HomePageNav />
      </div>
    </>
  );
}
