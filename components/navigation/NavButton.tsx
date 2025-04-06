import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const NavButton = ({
  href,
  title,
  icon,
  alt,
}: {
  href: string;
  title: string;
  icon: string;
  alt: string;
}) => {
  return (
    <>
      <Button asChild>
        <Link href={href} className="flex justify-center items-center ">
          <p className="flex items-center space-x-5">
            {title}
            <span>
              <Image
                className="ml-2"
                src={icon}
                alt={alt}
                width={24}
                height={24}
              />
            </span>
          </p>
        </Link>
      </Button>
    </>
  );
};

export default NavButton;
