import Image from "next/image";
import React from "react";
import { User } from "./User";

const CONTENT = [
  {
    id: 1,
    src: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    description:
      "Something is very nice happening around here when the blue fox has just jumped over the red tree.",
  },
];

const ContentCard = () => {
  return (
    <>
      {CONTENT.map((content) => (
        <div key={content.id} className="flex flex-col">
          <div className=" h-[240px] w-[426px] relative">
            <Image
              className="rounded-[10px]"
              alt="content"
              src={content.src}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
          <User />
        </div>
      ))}
    </>
  );
};

export default ContentCard;
