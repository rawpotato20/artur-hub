"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import { NavUser } from "../NavUser";
import { Button } from "../ui/button";
import { getRefreshToken } from "@/lib/utils";

type UserType = {
  personName: string;
  image: string;
};

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<UserType | null>(null);
  const [refreshResult, setRefreshResult] = useState<any>(null);

  async function fetchUser() {
    try {
      const res = await fetch("/api/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setIsLoggedIn(true);
      } else {
        setRefreshResult(getRefreshToken());
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [refreshResult]);

  async function logoutUser() {
    const res = await fetch("/api/signOutUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      window.location.href = "/sign-in";
    } else {
      console.error("Failed to log out");
    }
  }

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

          {user && (
            <NavUser USER={{ name: user.personName, image: user.image }} />
          )}
        </div>

        <div className="flex space-x-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/" className="flex justify-center items-center ">
              <p className="flex items-center space-x-5">
                Pagrindinis
                <span>
                  <Image
                    className="ml-2"
                    src="/icons/home.svg"
                    alt="Homepage"
                    width={24}
                    height={24}
                  />
                </span>
              </p>
            </Link>
          </Button>

          {isLoggedIn ? (
            <Button asChild>
              <Link
                href="/sign-in"
                className="flex justify-center items-center"
              >
                <p className="flex items-center space-x-5">
                  Prisijungti
                  <span>
                    <Image
                      className="ml-2"
                      src="/icons/login.svg"
                      alt="Login"
                      width={24}
                      height={24}
                    />
                  </span>
                </p>
              </Link>
            </Button>
          ) : (
            <Button onClick={logoutUser} asChild>
              <Link
                href="/sign-in"
                className="flex justify-center items-center"
              >
                <p className="flex items-center space-x-5">
                  Atsijungti
                  <span>
                    <Image
                      className="ml-2"
                      src="/icons/logout.svg"
                      alt="Logout"
                      width={24}
                      height={24}
                    />
                  </span>
                </p>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
