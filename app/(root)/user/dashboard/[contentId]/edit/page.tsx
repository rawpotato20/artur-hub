"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/components/User";
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

  tags: ["bobin", "artur"],
};

const page = ({ props }: { props: string }) => {
  const [tags, setTags] = React.useState<string[]>(CONTENT.tags);

  function handleDelete(tag: string) {
    setTags((prevTags) => prevTags.filter((currentTag) => currentTag !== tag));
  }

  function handleAdd() {}

  return (
    <>
      <div className="mx-[12%]">
        <div className="relative my-10 h-[50vh] rounded-[20px] overflow-hidden">
          {/* Blurred background image layer */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md"
            style={{ backgroundImage: `url(${CONTENT.src})` }}
          ></div>

          {/* Colored overlay if needed */}
          <div className="absolute inset-0 bg-primary opacity-80"></div>

          {/* Content layer */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center h-full">
            <div className="mx-[33%]">
              <h1 className="text-accent font-bold text-2xl">
                Įmeskite savo vaizdo įrašą
              </h1>
              <Button className="w-full rounded-[20px] bg-gradient text-white mt-3">
                Arba pasirinkite iš savo failų{" "}
                <span>
                  <Image
                    width={24}
                    height={24}
                    alt="upload"
                    src="/icons/upload.svg"
                  />
                </span>
              </Button>
            </div>
          </div>
        </div>

        <User className="mb-2" textColor="text-primary" />

        <div className="bg-primary text-primary p-3 pb-10 rounded-[20px] ">
          {CONTENT.description}
        </div>

        <div className="mt-5 flex space-x-4 items-center">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="rounded-[20px] bg-primary px-2 pl-6 w-fit font-bold"
            >
              {"#"}
              {tag}{" "}
              <span>
                <Button onClick={() => handleDelete(tag)}>
                  <Image
                    src="/icons/x.svg"
                    width={12}
                    height={12}
                    alt="delete"
                  />
                </Button>
              </span>
            </div>
          ))}

          <Button
            onClick={handleAdd}
            className="bg-green-500 p-3 px-10 rounded-[20px]"
          >
            <Image src="/icons/+.svg" width={12} height={12} alt="add" />
          </Button>
        </div>
        <p className="mt-1">(Galite pridėti iki 5 hashtag'ų)</p>

        <Button className="w-full bg-gradient text-white dark:text-black rounded-[20px] mt-5 text-1xl font-bold">
          REDAGUOTI
        </Button>
      </div>
    </>
  );
};

export default page;
