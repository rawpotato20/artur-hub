"use client";

import CommentCard from "@/components/cards/CommentCard";
import ContentCardBelt from "@/components/ContentCardBelt";
import Tags from "@/components/Tags";
import WriteCommentCard from "@/components/cards/WriteCommentCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getContent } from "@/lib/utils/content";
import { getUser } from "@/lib/utils/users";
import { getRefreshToken } from "@/lib/utils/tokens";

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

const Content = ({ params }: { params: { contentId: string } }) => {
  const [user, setUser] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [refreshResult, setRefreshResult] = useState<any>(false);
  const [data, setData] = useState<any>(null);
  const [contentId, setContentId] = useState<string>("");

  async function fetchUser(retry = true) {
    try {
      const data = await getUser();

      console.log("data:", data);

      if (data.success) {
        setUser(data.data.username);
        setIsLoggedIn(true);
      } else if ((data.status == 401 || data.status == 403) && retry) {
        console.warn("Access token might be expired. Trying to refresh...");
        // Try again once, server will attempt to refresh if possible
        const result = await getRefreshToken();
        setRefreshResult(result);
        if (result) {
          setIsLoggedIn(true);
          return fetchUser(false);
        }
      } else {
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [refreshResult]);

  useEffect(() => {
    // Async function inside useEffect
    const getData = async () => {
      try {
        const resolvedParams = await params;
        const contentIdFromParams = resolvedParams.contentId;

        setContentId(contentIdFromParams);

        const res = await getContent(contentId);
        const data = await res.json();
        setData(data); // set the content data state
        console.log(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    getData(); // Call the async function to fetch content
  }, [contentId]);

  if (!data) {
    return (
      <h1 className="flex justify-center mt-5 text-xl text-accent">
        Loading...
      </h1>
    );
  }

  return (
    <>
      {data.post.contentType == "Video" ? (
        <div className="mx-[12%] mt-10 h-[648px] w-[auto] flex justify-center items-center text-3xl">
          <video
            controls
            className="w-full h-full object-cover rounded-[20px] "
          >
            <source src={data.post.content} />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="mx-[12%] mt-10 rounded-[20px] overflow-hidden bg-black w-fit">
          <Image
            src={data.post.content}
            alt="content"
            height={648}
            width={9999}
            className="rounded-[20px]"
          />
        </div>
      )}

      <div className="mx-[12%] mt-3">
        <ContentCardBelt CONTENT={data.post} />

        <p className="text-primary line-clamp-6 my-2">{data.post.title}</p>

        <Tags tags={data.post.tags} className="mb-5" />

        <hr className="mb-5"></hr>

        <h1 className="text-accent font-bold text-3xl">Komentarai:</h1>

        {data.post.comments.length == 0 ? (
          <p className="flex justify-center items-center font-bold text-lg my-20">
            Čia labai tuščia...
          </p>
        ) : (
          data.post.comments.map((comment: COMMENT) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              className="my-10"
            />
          ))
        )}
        {isLoggedIn && (
          <WriteCommentCard
            user={data.post.user}
            key={data.post.contentId}
            className="mb-10"
          />
        )}
      </div>
    </>
  );
};

export default Content;
