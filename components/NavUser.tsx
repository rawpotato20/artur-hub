import Image from "next/image";
import Link from "next/link";
import React from "react";

const USER = {
  name: "John Doe",
  image: "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
};

interface Props {
  className?: string;
  textColor?: string;
  scale?: string;
  USER: {
    name: string;
    image: string;
  };
}

export const NavUser = ({ className, textColor, scale, USER }: Props) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
      className={`flex space-x-3 text-[20px] ${className || ""}`}
    >
      <Link href="/user/profile" className="flex">
        <Image
          src={USER?.image}
          alt="Profile Picture"
          height={50}
          width={50}
          className="rounded-full"
        />

        <div className="flex items-center space-x-1 ml-3">
          <p className={textColor ? textColor : `text-accent`}>{USER?.name}</p>
        </div>
      </Link>
    </div>
  );
};
