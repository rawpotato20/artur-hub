"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";

interface Props {
  className?: string;
  dynamicPathName: string;
  active: "newest" | "popular" | "recommended";
  filter: "all" | "photos" | "videos";
}

const HomePageNavMobile = ({
  className,
  dynamicPathName,
  active,
  filter,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex justify-between w-full mt-7 ${className}`}>
      <Button className="w-full" onClick={() => setOpen(true)}>
        Filtrai
      </Button>

      {open && (
        <div className="fixed top-0 bg-black bg-opacity-60 left-0 h-full w-full z-[1000] flex justify-center items-center">
          <div className="bg-primary p-6 rounded-[20px]">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Filtrai</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div className="mt-4 flex flex-col space-y-2">
              <Button
                className={`w-full bg-primary text-primary rounded-[20px] ${
                  active === "newest" && "bg-gradient"
                }`}
              >
                <Link href={`${dynamicPathName}/newest`}>Naujausi</Link>
              </Button>

              <Button
                className={`w-full bg-primary text-primary rounded-[20px] ${
                  active === "popular" && "bg-gradient"
                }`}
              >
                <Link href={`${dynamicPathName}/popular`}>Populiariausi</Link>
              </Button>

              <Button
                className={`w-full bg-primary text-primary rounded-[20px] ${
                  active === "recommended" && "bg-gradient"
                }`}
              >
                <Link href={`${dynamicPathName}/recommended`}>
                  Rekomenduojami
                </Link>
              </Button>

              <div className="flex space-x-5 !mt-6">
                <Link
                  className={`px-3 py-1 rounded-[10px] ${
                    filter === "all" ? `bg-gradient` : ""
                  }`}
                  href={`${dynamicPathName}/${active}?filter=all`}
                >
                  Visi
                </Link>
                <Link
                  className={`px-3 py-1 rounded-[10px] ${
                    filter === "photos" && `bg-gradient`
                  }`}
                  href={`${dynamicPathName}/${active}?filter=photos`}
                >
                  Nuotraukos
                </Link>
                <Link
                  className={`px-3 py-1 rounded-[10px] ${
                    filter === "videos" && `bg-gradient`
                  }`}
                  href={`${dynamicPathName}/${active}?filter=videos`}
                >
                  Vaizdo įrašai
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageNavMobile;
