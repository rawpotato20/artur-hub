"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getUser, verifyUser } from "@/lib/utils/users";
import { getRefreshToken } from "@/lib/utils/tokens";

const CONTENT = [
  {
    user: "johndoe",
    id: 1,
    type: "image",
    content:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
  },
  {
    user: "johndoe",
    id: 2,
    type: "image",
    content:
      "https://media.istockphoto.com/id/154232673/photo/blue-ridge-parkway-scenic-landscape-appalachian-mountains-ridges-sunset-layers.jpg?s=612x612&w=0&k=20&c=m2LZsnuJl6Un7oW4pHBH7s6Yr9-yB6pLkZ-8_vTj2M0=",
  },
  {
    user: "johndoe",
    id: 3,
    type: "image",
    content:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
  },
  {
    user: "johndoe",
    id: 4,
    type: "image",
    content:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
  },
  {
    user: "johndoe",
    id: 5,
    type: "image",
    content:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
  },
  {
    user: "johndoe",
    id: 6,
    type: "image",
    content:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
  },
  {
    user: "johndoe",
    id: 7,
    type: "image",
    content:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
  },
];

export const SidePanel = ({ className }: { className?: string }) => {
  const [user, setUser] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [refreshResult, setRefreshResult] = useState<any>(false);

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

  return (
    <div className={` ${!isLoggedIn && "hidden"} ${className}`}>
      <p className="flex mt-5 text-2xl font-bold text-[#ff7000] mx-6 pb-2">
        Jūsų įrašai:
      </p>

      <div className="mx-8 h-[65%] overflow-y-auto custom-scroll">
        {CONTENT.map((item) => {
          return (
            <div key={item.id} className="my-4">
              <Link href={`/user/content/${item.id}`}>
                <Image
                  src={item.content}
                  alt={`Image ${item.id}`}
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="text-[#ff7000] mx-6 flex items-center justify-center h-[10%] text-[20px]">
        <Link href="./user/dashboard">Daugiau įrašų...</Link>
      </div>
      <div className="h-[10%] mx-6">
        <Button
          className="flex items-center text-primary bg-gradient justify-center h-[55px] font-bold text-2xl rounded-[20px]"
          asChild
        >
          <Link onClick={() => fetchUser(true)} href={`/${user}/create`}>
            KURTI
          </Link>
        </Button>
      </div>
    </div>
  );
};
