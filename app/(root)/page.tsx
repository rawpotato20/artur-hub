import ContentCard from "@/components/ContentCard";
import { HomePageNav } from "@/components/navigation/HomePageNav";
import { SidePanel } from "@/components/navigation/SidePanel";
import Tags from "@/components/Tags";

const signedOut = false;

const CONTENT = [
  {
    id: 1,
    src: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    description:
      "Something is very nice happening around here when the blue fox has just jumped over the red tree. Something is very nice happening around here when the blue fox has just jumped over the red tree",
  },
  {
    id: 2,
    src: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    description:
      "Something is very nice happening around here when the blue fox has just jumped over the red tree. Something is very nice happening around here when the blue fox has just jumped over the red tree",
  },
  {
    id: 3,
    src: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    description:
      "Something is very nice happening around here when the blue fox has just jumped over the red tree. Something is very nice happening around here when the blue fox has just jumped over the red tree",
  },
  {
    id: 4,
    src: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    description:
      "Something is very nice happening around here when the blue fox has just jumped over the red tree. Something is very nice happening around here when the blue fox has just jumped over the red tree",
  },
];

export default function Home() {
  return (
    <>
      <div
        className={`flex ${
          signedOut ? "ml-[50px] max-md:ml-0" : "ml-[300px] max-md:ml-0"
        }`}
      >
        <SidePanel className={`{signedOut ? "hidden" : ""} max-md:hidden`} />
        <HomePageNav className="mx-7" />
      </div>

      <div
        className={`flex my-3 max-xl:overflow-x-auto ${
          signedOut ? "ml-[75px]" : "ml-[325px] max-md:mx-7"
        }`}
      >
        <Tags className="max-h-[95px] overflow-y-hidden" />
      </div>

      <div
        className={`grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-6 auto-rows-auto mt-10 mr-7 ${
          signedOut ? "ml-[75px] max-md:mx-7" : "ml-[325px] max-md:mx-7"
        }`}
      >
        {CONTENT.map((content) => (
          <div key={content.id}>
            <ContentCard CONTENT={content} />
          </div>
        ))}
      </div>
    </>
  );
}
