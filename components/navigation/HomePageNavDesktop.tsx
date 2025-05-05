import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  className?: string;
  dynamicPathName: string;
  active: "newest" | "popular" | "recommended";
  filter: "all" | "photos" | "videos";
}

const HomePageNavDesktop = ({
  className,
  dynamicPathName,
  active,
  filter,
}: Props) => {
  return (
    <div className={`flex justify-between mt-7 ${className}`}>
      <div className="space-x-4">
        <Button
          className={`w-[150px] bg-primary text-primary rounded-[20px] ${
            active === "newest" && "bg-gradient"
          }`}
        >
          <Link href={`${dynamicPathName}/newest`}>Naujausi</Link>
        </Button>

        <Button
          className={`w-[175px] bg-primary text-primary rounded-[20px] ${
            active === "popular" && "bg-gradient"
          }`}
        >
          <Link href={`${dynamicPathName}/popular`}>Populiariausi</Link>
        </Button>

        <Button
          className={`w-[200px] bg-primary text-primary rounded-[20px] ${
            active === "recommended" && "bg-gradient"
          }`}
        >
          <Link href={`${dynamicPathName}/recommended`}>Rekomenduojami</Link>
        </Button>
      </div>

      <div className="ml-auto">
        <Button className="rounded-[20px] bg-primary text-primary">
          <Link
            className={`px-3 ${filter === "all" ? `bg-gradient` : ""}`}
            href={`${dynamicPathName}/${active}?filter="all"`}
          >
            Visi
          </Link>
          <Link
            className={`px-3 ${filter === "photos" && `bg-gradient`}`}
            href={`${dynamicPathName}/${active}?filter="photos"`}
          >
            Nuotraukos
          </Link>
          <Link
            className={`px-3 ${filter === "videos" && `bg-gradient`}`}
            href={`${dynamicPathName}/${active}?filter="videos"`}
          >
            Vaizdo įrašai
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePageNavDesktop;
