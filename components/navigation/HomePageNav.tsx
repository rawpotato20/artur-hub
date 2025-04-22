import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import HomePageNavDesktop from "../HomePageNavDesktop";
import HomePageNavMobile from "../HomePageNavMobile";

const dynamicPathName = "";
const active: "newest" | "popular" | "recommended" = "newest";
const filter: "all" | "photos" | "videos" = "all";

export const HomePageNav = ({ className }: { className?: string }) => {
  return (
    <>
      <HomePageNavDesktop
        className={`max-xl:hidden ${className}`}
        dynamicPathName=""
        active="newest"
        filter="all"
      />

      <HomePageNavMobile
        className={`xl:hidden ${className}`}
        dynamicPathName=""
        active="newest"
        filter="all"
      />
    </>
  );
};
