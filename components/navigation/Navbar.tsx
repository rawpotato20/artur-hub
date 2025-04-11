import React from "react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import NavButton from "./NavButton";
import { User } from "../User";

export const Navbar = () => {
  return (
    <>
      <div className="flex justify-between px-6 items-center h-[70px] sticky top-0 bg-primary z-20">
        <div className="flex items-center space-x-4">
          <Link href="./">
            <Image
              src="/icons/logo-darkmode.svg"
              alt="Logo"
              width={150}
              height={70}
              className="block dark:hidden"
            />
            <Image
              src="/icons/logo.svg"
              alt="Logo"
              width={150}
              height={70}
              className="hidden dark:block"
            />

            <p className="text-[15px]">Everything Bobin</p>
          </Link>

          <User />
        </div>

        <div className="flex space-x-4">
          <ModeToggle />
          <NavButton
            href="/"
            title="Pagrindinis"
            icon="/icons/home.svg"
            alt="Home"
          />

          <NavButton
            href="/sign-in"
            title="Atsijungti"
            icon="/icons/logout.svg"
            alt="Log Out"
          />
        </div>
      </div>
    </>
  );
};
