import Image from "next/image";
import React from "react";

const USER = {
  name: "John Doe",
  image: "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
};

interface Props {
  className?: string;
  textColor?: string;
  scale?: string;
}

export const BodyUser = ({ className, textColor, scale }: Props) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
      className={`flex space-x-3 text-[20px] ${className || ""}`}
    >
      <Image src={USER?.image} alt="Profile Picture" height={50} width={50} />

      <div className="flex items-center space-x-1">
        <p className={textColor ? textColor : `text-accent`}>{USER?.name}</p>
      </div>
    </div>
  );
};
