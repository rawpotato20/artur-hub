import ContentCard from "@/components/ContentCard";
import { HomePageNav } from "@/components/navigation/HomePageNav";
import Tags from "@/components/Tags";
import React from "react";

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

const page = () => {
  return (
    <>
      <div className="mx-[5%] mt-5">
        <h1 className="text-accent text-4xl font-bold">Visi Jūsų įrašai:</h1>

        <HomePageNav />
        <Tags className="my-3" />
        <div className="flex flex-wrap gap-x-6">
          {CONTENT.map((content) => (
            <div key={content.id} className="w-[492px]">
              <ContentCard isUser CONTENT={content} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
