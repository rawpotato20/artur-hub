"use client";

import React, { useState } from "react";
import { NavUser } from "@/components/NavUser";
import { postComment } from "@/lib/utils/content";

interface USER {
  personName: string;
  image: string;
  _id: string;
}

const WriteCommentCard = ({
  className,
  user,
  key,
}: {
  className?: string;
  key: string;
  user: USER;
}) => {
  const [comment, setComment] = useState<string>("");

  async function handlePostComment() {
    const res = await postComment(comment, user._id, key);
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      <div
        className={`p-4 pr-0 bg-primary rounded-[20px] flex justify-between ${className}`}
      >
        <div className="flex-1">
          <NavUser
            textColor="text-primary"
            className="-mt-6 -ml-6"
            USER={user}
          />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Palikite komentarą..."
            className="bg rounded-[20px] p-3 mx-9 w-[calc(100%-72px)]"
          />
        </div>

        <div className="flex justify-center space-x-7 min-w-[150px] -mb-4 mt-6">
          <button
            onClick={handlePostComment}
            className="hover:bg-gradient hover:text-primary bg w-full h-full rounded-tl-[20px] rounded-br-[20px] font-bold text-accent"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default WriteCommentCard;
