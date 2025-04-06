import React from "react";
import ToggleTheme from "../ToggleTheme";
import Link from "next/link";
import Image from "next/image";
import NavButton from "./NavButton";
import { User } from "../User";

export const Navbar = () => {
  return (
    <>
      <div className="flex justify-between px-6 items-center h-[100px] dark:bg-[#0f1117] bg-[#e9e9e9]">
        <div className="flex items-center space-x-4">
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

            <p className="text-[15px]">Everything Bobin</p>
          </Link>

          <User />
        </div>

        <div className="flex space-x-4">
          <ToggleTheme />
          <NavButton
            href="./"
            title="Pagrindinis"
            icon="/icons/home.svg"
            alt="Home"
          />

          <NavButton
            href="./"
            title="Atsijungti"
            icon="/icons/logout.svg"
            alt="Log Out"
          />
        </div>
      </div>
    </>
  );
};
