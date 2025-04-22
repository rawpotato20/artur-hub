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
      <div className={`flex ${signedOut ? "ml-[50px]" : "ml-[300px]"}`}>
        <SidePanel className={signedOut ? "hidden" : ""} />
        <HomePageNav className="mx-7" />
      </div>

      <div
        className={`flex my-3 max-xl:overflow-x-auto ${
          signedOut ? "ml-[75px]" : "ml-[325px]"
        }`}
      >
        <Tags className="max-xl:whitespace-nowrap" />
      </div>

      <div
        className={`flex flex-wrap mt-10 gap-x-6 ${
          signedOut ? "ml-[75px]" : "ml-[325px]"
        }`}
      >
        {CONTENT.map((content) => (
          <div key={content.id} className="w-[492px]">
            <ContentCard CONTENT={content} />
          </div>
        ))}
      </div>
    </>
  );
}
