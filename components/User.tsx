import Image from "next/image";
import React from "react";

const USER = {
  name: "John Doe",
  image: "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
  isVerified: true,
};

export const User = ({
  className,
  textColor,
  scale,
}: {
  className?: string;
  textColor?: string;
  scale?: string;
}) => {
  return (
    <div
      className={`flex space-x-3 text-[20px] origin-top-left scale-[${
        scale || "1"
      }] ${className || ""}`}
    >
      <Image src={USER.image} alt="Profile Picture" height={50} width={50} />

      <div className="flex items-center space-x-1">
        <p className={textColor ? textColor : `text-accent`}>{USER.name}</p>
        {USER.isVerified && (
          <div>
            <Image
              src="/icons/verified.png"
              alt="Verified"
              height={16}
              width={16}
            />
          </div>
        )}
      </div>
    </div>
  );
};
