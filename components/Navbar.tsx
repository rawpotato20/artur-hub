import React from "react";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <>
      <div className="flex justify-between px-6 items-center h-[100px] dark:bg-[#0f1117] bg-[#e9e9e9]">
        <Link href="./">
          <Image
            src="/icons/logo-darkmode.svg"
            alt="Logo"
            width={200}
            height={100}
            className="block dark:hidden"
          />
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={200}
            height={100}
            className="hidden dark:block"
          />
        </Link>

        <div className="flex space-x-4">
          <ToggleTheme />

          <Link href="./" className="flex justify-center items-center ">
            <p className="flex items-center space-x-5">
              Pagrindinis
              <span>
                <Image
                  className="ml-2"
                  src="/icons/home.svg"
                  alt="Home"
                  width={24}
                  height={24}
                />
              </span>
            </p>
          </Link>
          <Link href="./" className="flex justify-center items-center">
            <p className="flex items-center space-x-5">
              Atsijungti
              <span>
                <Image
                  className="ml-2"
                  src="/icons/logout.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                />
              </span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};
