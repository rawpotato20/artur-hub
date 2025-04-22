import Image from "next/image";
import React from "react";
import Tags from "./Tags";
import { Button } from "./ui/button";
import Link from "next/link";
import { BodyUser } from "./BodyUser";

interface CONTENT {
  id: number;
  src: string;
  description: string;
}

const ContentCard = ({
  isUser,
  CONTENT,
}: {
  isUser?: boolean;
  CONTENT: CONTENT;
}) => {
  return (
    <>
      <div>
        {isUser ? (
          <div className="flex flex-col mb-10">
            <div className={` h-[277px] w-[492px] relative`}>
              <Link href={`/user/content/${CONTENT.id}`}>
                <Image
                  className="rounded-[10px]"
                  alt="content"
                  src={CONTENT.src}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </div>

            <div className={`w-[492px] line-clamp-2 mt-[7px] `}>
              <p className="primary-white">{CONTENT.description}</p>
            </div>

            <div className="w-[492px] overflow-x-auto mt-2">
              <Tags
                className={`flex space-x-2 whitespace-nowrap`}
                tags={["arturka", "arturec", "DJPIska"]}
              />
            </div>

            <Link href={`/user/dashboard/${CONTENT.id}/edit`}>
              <Button className="mt-[7px] rounded-[20px] w-full">
                Redaguoti
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col mb-10">
            <div className={` h-[277px] w-[492px] relative`}>
              <Link href={`/user/content/${CONTENT.id}`}>
                <Image
                  className="rounded-[10px]"
                  alt="content"
                  src={CONTENT.src}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </div>

            <BodyUser
              scale="0.75"
              textColor="primary-white"
              className="mt-[7px]"
            />

            <div className={`w-[492px] line-clamp-2 mt-[-7px] `}>
              <p className="primary-white">{CONTENT.description}</p>
            </div>

            <Tags
              className={`w-[492px] overflow-hidden max-h-[36px] mt-2`}
              tags={["arturka", "arturec", "DJPIska"]}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ContentCard;
