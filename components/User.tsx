import Image from "next/image";
import React from "react";

const USER = {
  name: "John Doe",
  image:
    "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
  isVerified: true,
};

export const User = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex justify-center items-center space-x-3 text-[20px] ${
        className || ""
      }`}
    >
      <Image src={USER.image} alt="Profile Picture" height={50} width={50} />

      <div className="flex items-center space-x-1">
        <p className="text-[#ff7000]">{USER.name}</p>
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
