"use client";

import { Button } from "@/components/ui/button";
import { NavUser } from "@/components/NavUser";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { data, Router } from "react-router-dom";
import { useRouter } from "next/navigation";

type UserType = {
  personName: string;
  image: string;
};

const DATA = {
  url: "/public/other/main.mp4",
  title: "Pavadinimas",
  tags: ["tag1", "tag2"],
  content: "/public/other/main.mp4",
  contentType: "Video",
  userId: "68076bca2e953243505d8019",
};

const page = () => {
  const router = useRouter();

  const [tags, setTags] = useState<string[]>(["artur"]);

  const [user, setUser] = useState<UserType | null>(null);

  async function handleUpload() {
    const res = await fetch("/api/uploadContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DATA),
    });

    if (res.ok) {
      console.log("Upload successful");
      router.push("/");
    } else {
      console.error("Failed to upload");
    }
  }

  useEffect(() => {
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
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, []);

  function handleDelete(tag: string) {
    setTags((prevTags) => prevTags.filter((currentTag) => currentTag !== tag));
  }

  function handleAdd() {}

  return (
    <>
      <div className="mx-[12%]">
        <div className="bg-primary my-10 rounded-[20px] flex flex-col justify-center items-center text-center h-[30vh] bg-upload bg-cover bg-center">
          <div className="mx-[33%]">
            <h1 className="text-accent font-bold text-2xl">
              Įmeskite savo vaizdo įrašą
            </h1>
            <Button className="w-full rounded-[20px] bg-gradient text-white mt-3">
              Arba pasirinkite iš savo failų{" "}
              <span>
                <Image
                  width={24}
                  height={24}
                  alt="upload"
                  src="/icons/upload.svg"
                />
              </span>
            </Button>
          </div>
        </div>

        {user && (
          <NavUser
            className="mb-2"
            textColor="text-primary"
            USER={{ name: user.personName, image: user.image }}
          />
        )}

        <div className="bg-primary text-primary p-3 pb-10 rounded-[20px] ">
          Įveskite aprašymą čia...
        </div>

        <div className="mt-5 flex space-x-4 items-center">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="rounded-[20px] bg-primary px-2 pl-6 w-fit font-bold"
            >
              {"#"}
              {tag}{" "}
              <span>
                <Button onClick={() => handleDelete(tag)}>
                  <Image
                    src="/icons/x.svg"
                    width={12}
                    height={12}
                    alt="delete"
                  />
                </Button>
              </span>
            </div>
          ))}

          <Button
            onClick={handleAdd}
            className="bg-green-500 p-3 px-10 rounded-[20px]"
          >
            <Image src="/icons/+.svg" width={12} height={12} alt="add" />
          </Button>
        </div>
        <p className="mt-1">(Galite pridėti iki 5 hashtag'ų)</p>

        <Button
          onClick={handleUpload}
          className="w-full bg-gradient text-white dark:text-black rounded-[20px] mt-5 text-1xl font-bold"
        >
          ĮKELTI
        </Button>
      </div>
    </>
  );
};

export default page;
