import ContentCard from "@/components/cards/ContentCard";
import { HomePageNav } from "@/components/navigation/HomePageNav";
import Tags from "@/components/Tags";
import React from "react";

const page = () => {
  return (
    <>
      <div className="mx-[5%] mt-5">
        <h1 className="text-accent text-4xl font-bold">Visi Jūsų įrašai:</h1>

        <HomePageNav />
        <Tags className="my-3 max-h-[95px] overflow-hidden" />
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-6 auto-rows-auto mt-10">
          {CONTENT.map((content) => (
            <div key={content.id} className="">
              <ContentCard isUser CONTENT={content} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
