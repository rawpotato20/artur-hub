import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

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
];

export const SidePanel = () => {
  return (
    <div className="h-screen bg-[#e9e9e9] dark:bg-[#0f1117] sticky top-0 z-50 w-[300px]">
      <p className="flex mt-5 text-2xl font-bold text-[#ff7000] mx-6">
        Jūsų įrašai:
      </p>

      <div className="mx-6 h-[60%] overflow-y-auto">
        {CONTENT.map((item) => {
          return (
            <div key={item.id} className="my-4">
              <Link href={`./${item.user}/${item.id}`}>
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
        <Link href="./">Daugiau įrašų...</Link>
      </div>
      <div className="h-[10%] mx-6">
        <Button
          className="flex items-center text-[#e9e9e9] dark:text-[#0f1117] bg-red-500 justify-center h-[55px] font-bold text-2xl rounded-lg"
          asChild
        >
          <Link href="./">KURTI</Link>
        </Button>
      </div>
    </div>
  );
};
