import Image from "next/image";
import React from "react";

const USER = {
  name: "John Doe",
  image: "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
};

interface User {
  _id: string;
  id: string;
  email: string;
  username: string;
  password: string;
  personName: string;
  image: string;
  posts: any[];
  comments: any[];
  provider: string;
  __v: number;
}

interface Props {
  className?: string;
  textColor?: string;
  scale?: string;
  USER: User;
}

export const BodyUser = ({ className, textColor, scale, USER }: Props) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
      className={`flex space-x-3 text-[20px] ${className || ""}`}
    >
      <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
        <Image
          src={USER?.image}
          alt="Profile Picture"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center space-x-1">
        <p className={textColor ? textColor : `text-accent`}>
          {USER?.personName}
        </p>
      </div>
    </div>
  );
};
