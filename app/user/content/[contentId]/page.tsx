import CommentCard from "@/components/CommentCard";
import ContentCardBelt from "@/components/ContentCardBelt";
import Tags from "@/components/Tags";
import WriteCommentCard from "@/components/WriteCommentCard";
import Image from "next/image";
import React from "react";

const CONTENT = {
  id: 1,
  isVideo: true,
  src: "https://media.istockphoto.com/id/154232673/photo/blue-ridge-parkway-scenic-landscape-appalachian-mountains-ridges-sunset-layers.jpg?s=612x612&w=0&k=20&c=m2LZsnuJl6Un7oW4pHBH7s6Yr9-yB6pLkZ-8_vTj2M0=",
  description:
    "Something is very nice happening around here when the blue fox has just jumped over the red tree. Something is very nice happening around here when the blue fox has just jumped over the red tree",
  views: 100,
  likes: 50,
  dislikes: 50,

  user: {
    name: "John Doe",
    image: "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
    isVerified: true,
  },

  tags: ["atrur", "bobin"],

  comments: [
    {
      user: {
        name: "John Doe",
        image: "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
        isVerified: true,
      },
      comment:
        "This is this is something not that bad actually now that I think about it. ",
      likes: 20,
      dislikes: 20,
      id: 1,
    },
    {
      user: {
        name: "John Doe",
        image: "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
        isVerified: true,
      },
      comment:
        "This is this is something not that bad actually now that I think about it.",
      likes: 20,
      dislikes: 20,
      id: 3,
    },
    {
      user: {
        name: "John Doe",
        image: "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
        isVerified: true,
      },
      comment:
        "This is this is something not that bad actually now that I think about it.",
      likes: 20,
      dislikes: 20,
      id: 2,
    },
  ],
};

const Content = () => {
  return (
    <>
      {CONTENT.isVideo ? (
        <div className="bg-gradient mx-[12%] my-10 h-[648px] w-[auto] rounded-[20px] flex justify-center items-center text-3xl">
          <h1>[Insert some video player]</h1>
        </div>
      ) : (
        <div className="mx-auto my-10 rounded-[20px] overflow-hidden bg-black w-fit">
          <Image
            src={CONTENT.src}
            alt="content"
            height={648}
            width={9999}
            className="h-[648px] w-auto rounded-[20px]"
          />
        </div>
      )}

      <div className="mx-[12%]">
        <ContentCardBelt CONTENT={CONTENT} />

        <p className="text-primary line-clamp-6 ml-[60px] mb-2">
          {CONTENT.description}
        </p>

        <Tags tags={CONTENT.tags} className="mb-5" />

        <hr className="mb-5"></hr>

        <h1 className="text-accent font-bold text-3xl">Komentarai:</h1>

        {CONTENT.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} className="my-10" />
        ))}

        <WriteCommentCard />
      </div>
    </>
  );
};

export default Content;
