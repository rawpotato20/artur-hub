import Image from "next/image";
import React from "react";
import { User } from "./User";
import Tags from "./Tags";

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
  {
    id: 5,
    src: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    description:
      "Something is very nice happening around here when the blue fox has just jumped over the red tree. Something is very nice happening around here when the blue fox has just jumped over the red tree",
  },
];

const ContentCard = () => {
  return (
    <>
      <div className="flex flex-row flex-wrap w-full">
        {CONTENT.map((content) => (
          <div key={content.id} className="flex flex-col mb-10 mr-10">
            <div className={` h-[264px] w-[469px] relative`}>
              <Image
                className="rounded-[10px]"
                alt="content"
                src={content.src}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>

            <User scale="0.75" textColor="primary-white" className="mt-[7px]" />

            <div className={`w-[469px] line-clamp-2 mt-[-7px] `}>
              <p className="primary-white">{content.description}</p>
            </div>

            <Tags
              className={`w-[469px] overflow-hidden max-h-[36px] mt-2`}
              tags={["arturka", "arturec", "DJPIska"]}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ContentCard;
