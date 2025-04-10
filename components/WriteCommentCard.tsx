import Image from "next/image";
import React from "react";
import { User } from "./User";

const WriteCommentCard = ({ className }: { className?: string }) => {
  return (
    <>
      <div
        className={`p-4 pr-0 bg-primary rounded-[20px] flex justify-between ${className}`}
      >
        <div className="flex-1">
          <User textColor="text-primary" className="-mt-6 -ml-6" />
          <div className="bg rounded-[20px] p-3 mr-9 ml-9">
            Palikite komentarą...
          </div>
        </div>

        <div className="bg rounded-tl-[20px] rounded-br-[20px] flex justify-center space-x-7 px-4 py-3 min-w-[150px] -mb-4 mt-6">
          <div className="flex items-center">
            <p className="text-green-500 inline-flex font-bold">
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

export default WriteCommentCard;
