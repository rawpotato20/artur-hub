import React from "react";
import { NavUser } from "@/components/NavUser";
import Image from "next/image";

interface USER {
  personName: string;
  image: string;
}

interface COMMENT {
  comments?: COMMENT[];
  content: string;
  likes: number;
  dislikes: number;
  user: USER;
  _id: string;
}

const CommentCard = ({
  comment,
  className,
}: {
  comment: COMMENT;
  className: string;
  writeQuestion?: boolean;
}) => {
  return (
    <>
      <div
        className={`p-4 pr-0 bg-primary rounded-[20px] flex justify-between ${className}`}
      >
        <div className="flex-1">
          <NavUser
            textColor="text-primary"
            className="-mt-6 -ml-6"
            USER={comment.user}
          />
          <p className="text-primary ml-9">{comment.content}</p>
        </div>

        <div className="bg rounded-tl-[20px] rounded-br-[20px] flex space-x-7 px-4 min-w-[150px] -mb-4 mt-6">
          <div className="flex items-center">
            <p className="text-green-500 inline-flex font-bold">
              {comment.likes}{" "}
              <span className="ml-2">
                <Image
                  width={24}
                  height={24}
                  alt="like"
                  src="/icons/like.svg"
                />
              </span>
            </p>
          </div>

          <div className="flex items-center">
            <p className="text-red-500 inline-flex font-bold">
              {comment.dislikes}{" "}
              <span className="ml-2">
                <Image
                  width={24}
                  height={24}
                  alt="dislike"
                  src="/icons/dislike.svg"
                />
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
