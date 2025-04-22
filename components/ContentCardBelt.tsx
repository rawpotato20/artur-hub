import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { User } from "./NavUser";

interface Content {
  id: number;
  isVideo: boolean;
  description: string;
  views: number;
  likes: number;
  dislikes: number;
  user: { name: string; image: string; isVerified: boolean };
}

const ContentCardBelt = ({
  CONTENT,
  className,
}: {
  CONTENT: Content;
  className?: string;
}) => {
  return (
    <>
      <div className={`w-full ${className}`}>
        <div className="flex justify-center mx-auto">
          <div className="flex justify-between space-x-20 w-full">
            <User textColor="text-primary" />

            <div className="flex space-x-6">
              <div className="flex items-center font-bold">
                <Button>
                  {CONTENT.views}{" "}
                  <span className="pl-2">
                    <Image
                      src="/icons/views.svg"
                      width={24}
                      height={24}
                      alt="views"
                    ></Image>
                  </span>
                </Button>
              </div>

              <div className="flex items-center font-bold text-green-500">
                <Button>
                  {CONTENT.likes}{" "}
                  <span className="pl-2">
                    <Image
                      src="/icons/like.svg"
                      width={24}
                      height={24}
                      alt="like"
                    ></Image>
                  </span>
                </Button>
              </div>

              <div className="flex items-center font-bold text-red-500">
                <Button>
                  {CONTENT.dislikes}{" "}
                  <span className="pl-2">
                    <Image
                      src="/icons/dislike.svg"
                      width={24}
                      height={24}
                      alt="dislikes"
                    ></Image>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentCardBelt;
