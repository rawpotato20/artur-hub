import Image from "next/image";
import React from "react";
import Tags from "../Tags";
import { Button } from "../ui/button";
import Link from "next/link";
import { BodyUser } from "../BodyUser";

interface User {
  _id: string;
  id: string;
  email: string;
  username: string;
  password: string;
  personName: string;
  image: string;
  posts: any[];
  comments: any[];
  provider: string;
  __v: number;
}

interface CONTENT {
  _id: string;
  likes: number;
  dislikes: number;
  comments: any[];
  views: number;
  title: string;
  content: string;
  contentType: string;
  thumbnail: string;
  tags: string[];
  user: User;
  __v: number;
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
            <div className="relative aspect-video">
              <Link href={`/${CONTENT.user.username}/content/${CONTENT._id}`}>
                <Image
                  className="rounded-[10px]"
                  alt="content"
                  src={CONTENT.thumbnail}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </div>

            <div className={`line-clamp-2 mt-[7px] `}>
              <p className="primary-white">{CONTENT.title}</p>
            </div>

            <div className=" overflow-x-auto mt-2">
              <Tags
                className={`flex space-x-2 whitespace-nowrap`}
                tags={CONTENT.tags}
              />
            </div>

            <Link href={`/user/dashboard/${CONTENT._id}/edit`}>
              <Button className="mt-[7px] rounded-[20px] w-full">
                Redaguoti
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col mb-10">
            <div className={`relative aspect-video`}>
              <Link href={`/${CONTENT.user.username}/content/${CONTENT._id}`}>
                <Image
                  className="rounded-[10px]"
                  alt="content"
                  src={CONTENT.thumbnail}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </div>

            <BodyUser
              scale="0.75"
              textColor="primary-white"
              className="mt-[10px]"
              USER={CONTENT.user}
            />

            <div className={`line-clamp-2 mt-[-7px] `}>
              <p className="primary-white">{CONTENT.title}</p>
            </div>

            <Tags className={`overflow-hidden mt-2`} tags={CONTENT.tags} />
          </div>
        )}
      </div>
    </>
  );
};

export default ContentCard;
