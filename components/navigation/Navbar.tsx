"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Link from "next/link";
import Image from "next/image";
import { NavUser } from "../NavUser";
import { Button } from "../ui/button";
import { getUser, signOutUser } from "@/lib/utils/users";
import { getRefreshToken } from "@/lib/utils/tokens";

type UserType = {
  personName: string;
  image: string;
};

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<UserType | null>(null);
  const [refreshResult, setRefreshResult] = useState<any>(null);

  const [path, setPath] = useState<string>("");

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  async function fetchUser(retry = true) {
    try {
      const data = await getUser();

      console.log("data:", data);

      if (data.success) {
        setUser(data.data);
        setIsLoggedIn(true);
      } else if ((data.status == 401 || data.status == 403) && retry) {
        console.warn("Access token might be expired. Trying to refresh...");
        // Try again once, server will attempt to refresh if possible
        const result = await getRefreshToken();
        setRefreshResult(result);
        if (result) {
          setIsLoggedIn(true);
          return fetchUser(false);
        }
      } else {
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
    const res = await signOutUser();

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
          <Link href="/">
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
            <NavUser
              USER={{ personName: user.personName, image: user.image }}
              className="max-md:hidden"
            />
          )}
        </div>

        <div className="flex space-x-4 max-md:hidden">
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
            <Button
              onClick={logoutUser}
              className="flex justify-center items-center"
            >
              <p className="flex items-center space-x-5">
                Atsijungti
                <span>
                  <Image
                    className="ml-2"
                    src="/icons/logout.svg"
                    alt="Login"
                    width={24}
                    height={24}
                  />
                </span>
              </p>
            </Button>
          ) : (
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

        <div className="md:hidden">
          <Button className="text-3xl" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </Button>

          {/* Sidebar */}
          {isOpen && (
            <div
              className={`fixed top-[70px] left-0 w-64 h-[calc(100vh-70px)] bg-primary shadow-lg z-10 animate-slideIn flex justify-between`}
            >
              <div className="flex flex-col my-10 justify-between w-full">
                <div className="space-y-5 flex justify-center flex-col">
                  <Button asChild>
                    <Link href="/" className="flex bg-secondary p-2 mx-5">
                      <p className="flex items-center space-x-5 text-xl ">
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
                    <>
                      <Button asChild>
                        <Link href="/" className="flex p-2 mx-5">
                          <p className="flex items-center space-x-5 text-xl">
                            Mano vaizdo įrašai
                          </p>
                        </Link>
                      </Button>

                      <Button asChild className="bg-gradient">
                        <Link href="/user/create" className="flex p-2 mx-5">
                          <p className="flex items-center space-x-5 text-xl">
                            KURTI
                            <span></span>
                          </p>
                        </Link>
                      </Button>

                      <Button asChild>
                        <Link
                          onClick={logoutUser}
                          href="/sign-in"
                          className="flex p-2 mx-5"
                        >
                          <p className="flex items-center space-x-5 text-xl">
                            Atsijungti
                            <span>
                              <Image
                                className="ml-2"
                                src="/icons/logout.svg"
                                alt="Login"
                                width={24}
                                height={24}
                              />
                            </span>
                          </p>
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Button asChild>
                      <Link href="/sign-in" className="flex p-2 mx-5">
                        <p className="flex items-center space-x-5 text-xl">
                          Prisijungti
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

                <div>
                  {user && (
                    <NavUser
                      USER={{ personName: user.personName, image: user.image }}
                      className="flex justify-center"
                    />
                  )}

                  <div className="flex justify-center">
                    <ModeToggle className="w-[80%] my-5" />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      className="p-4 bg-accent w-[80%]"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
