import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const dynamicPathName = "";
const active = "newest";
const filter = "all";

export const HomePageNav = () => {
  return (
    <>
      <div className="space-x-4 flex justify-between w-full mx-7 my-7">
        <Button
          className={`w-[150px] bg-[var(--primary-light)] text-[var(--primary-dark)] rounded-[20px] ${
            active === "newest" && "bg-red-500"
          }`}
        >
          <Link href={`${dynamicPathName}/newest`}>Naujausi</Link>
        </Button>

        <Button
          className={`w-[175px] bg-[var(--primary-light)] text-[var(--primary-dark)] rounded-[20px] ${
            active === "popular" ? "bg-red-500" : null
          }`}
        >
          <Link href={`${dynamicPathName}/popular`}>Populiariausi</Link>
        </Button>

        <Button
          className={`w-[200px] bg-[var(--primary-light)] text-[var(--primary-dark)] rounded-[20px] ${
            active === "reccomended" ? "bg-red-500" : null
          }`}
        >
          <Link href={`${dynamicPathName}/reccomended`}>Rekomenduojami</Link>
        </Button>

        <div className="ml-auto">
          <Button className="rounded-[20px] bg-[var(--primary-light)] text-[var(--primary-dark)]">
            <Link
              className={`px-3 ${filter === "all" ? `bg-red-500` : null}`}
              href={`${dynamicPathName}/${active}?filter="all"`}
            >
              Visi
            </Link>
            <Link
              className={`px-3 ${filter === "photos" ? `bg-red-500` : null}`}
              href={`${dynamicPathName}/${active}?filter="photos"`}
            >
              Nuotraukos
            </Link>
            <Link
              className={`px-3 ${filter === "videos" ? `bg-red-500` : null}`}
              href={`${dynamicPathName}/${active}?filter="videos"`}
            >
              Vaizdo įrašai
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};
