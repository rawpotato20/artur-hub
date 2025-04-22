import React from "react";
import { User } from "./NavUser";
import Image from "next/image";

interface Comment {
  user: { name: string; image: string; isVerified: boolean };
  comment: string;
  likes: number;
  dislikes: number;
}

const CommentCard = ({
  comment,
  className,
  writeQuestion,
}: {
  comment: Comment;
  className: string;
  writeQuestion?: boolean;
}) => {
  return (
    <>
      <div
        className={`p-4 pr-0 bg-primary rounded-[20px] flex justify-between ${className}`}
      >
        <div className="flex-1">
          <User textColor="text-primary" className="-mt-6 -ml-6" />
          <p className="text-primary ml-9">{comment.comment}</p>
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
              {comment.likes}{" "}
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
