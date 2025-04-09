import ContentCard from "@/components/ContentCard";
import { HomePageNav } from "@/components/navigation/HomePageNav";
import Tags from "@/components/Tags";
import React from "react";

const page = () => {
  return (
    <>
      <div className="mx-[5%] mt-5">
        <h1 className="text-accent text-4xl font-bold">Visi Jūsų įrašai:</h1>

        <HomePageNav />
        <Tags className="my-3" />
        <div>
          <ContentCard isUser />
        </div>
      </div>
    </>
  );
};

export default page;
