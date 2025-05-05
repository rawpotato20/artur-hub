"use client";

import { Button } from "@/components/ui/button";
import { NavUser } from "@/components/NavUser";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { getRefreshToken } from "@/lib/utils/tokens";
import { verifyUser, getUser } from "@/lib/utils/users";
import { uploadImage, uploadLargeFile, upsertPost } from "@/lib/utils/content";
import { blobToBase64 } from "@/lib/utils/utils";
import ProgressBar from "@/components/ProgressBar";

interface USER {
  name: string;
  image: string;
  id: string;
}

const page = () => {
  const router = useRouter();

  const [tags, setTags] = useState<string[]>([]);
  const [user, setUser] = useState<USER | null>(null);
  const [title, setTitle] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([""]);

  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [bytesUploaded, setBytesUploaded] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  const [wrongFormat, setWrongFormat] = useState<Boolean>(false);
  const [thumb, setThumb] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);

  async function handleUpload() {
    setLoading(true);
    checkUser();
    if (!file) {
      return console.log("No file selected!");
    }

    const blob = await fetch(thumb).then((res) => res.blob());
    const base64String = (await blobToBase64(blob)) as string;

    if (file.type.startsWith("image/")) {
      if (file.size > 50 * 1024 * 1024) {
        // only max 50MB per upload
        return console.log("Only 50MB per upload");
      }

      const res = await uploadImage(file);
      const data = await res.json();
      console.log("Key:", data.key);
      console.log("URL:", data.viewUrl);

      if (!user) {
        return console.log("No user found");
      }

      const upsert = await upsertPost({
        key: data.key,
        title: title,
        content: data.viewUrl,
        thumbnail: base64String,
        contentType: "Photo",
        user: user.id,
        tags: tags,
      });
      const upsertData = await upsert.json();
      console.log(upsertData);

      if (upsert.status === 201) {
        router.push(`/success?username=${user.name}&contentid=${data.key}`);
      }

      setLoading(false);
    } else if (file.type.startsWith("video/")) {
      if (file.size > 500 * 1024 * 1024) {
        // only max 500MB per upload
        return console.log("Only 500MB per upload");
      }

      const res = await uploadLargeFile(file, (newProgress, bytes) => {
        setProgress(newProgress);
        setBytesUploaded(bytes);
      });
      console.log(progress);
      const data = await res.json();
      console.log("Key:", data.key);
      console.log("Location:", data.loaction);

      if (!user) {
        return console.log("No user found");
      }

      const upsert = await upsertPost({
        key: data.key,
        title: title,
        content: data.location,
        thumbnail: base64String,
        contentType: "Video",
        user: user.id,
        tags: tags,
      });
      const upsertData = await upsert.json();
      console.log(upsertData);

      if (upsert.status === 201) {
        router.push("/success");
      }

      setLoading(false);
    } else {
      console.log("wrong format");
      setLoading(false);
    }
  }

  async function checkUser() {
    try {
      const res = await verifyUser();

      if (res.status == 400) {
        const newToken = await getRefreshToken();
        const result = await verifyUser();
        if (result.status != 200) {
          console.log("No access or refresh token found...");
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      window.location.href = "/";
    }
  }

  useEffect(() => {
    async function init() {
      const res = await verifyUser();

      if (res.status === 200) {
        const user = await getUser();
        console.log("User:", user);
        setUser({
          name: user.data?.personName,
          image: user.data?.image,
          id: user.data?._id,
        });
      } else if (res.status === 400) {
        console.warn("Trying to refresh...");
        const result = await verifyUser();
        if (result.status === 200) {
          const user = await getUser();
          console.log("User:", user);
          setUser({
            name: user.data?.personName,
            image: user.data?.image,
            id: user.data?._id,
          });
        } else {
          console.log("Refresh did not help");
          window.location.href = "/";
        }
      } else {
        console.log("Failed:", res.status);
        window.location.href = "/";
      }
    }

    init();
  }, []);

  function handleTagDelete(tag: string) {
    setTags((prevTags) => prevTags.filter((currentTag) => currentTag !== tag));
  }

  function handleTagAdd(tag: string) {
    setErrors([""]);

    if (tags.length >= 5) {
      console.log("Maximum of 5 tags reached");

      if (!errors.includes("Maximum of 5 tags reached.")) {
        setErrors([""]);
        setErrors((prevErrors) => [
          ...prevErrors,
          "Maximum of 5 tags reached.",
        ]);
      }
      return;
    }

    if (/[^a-zA-Z0-9_]/.test(newTag)) {
      console.log("tag contains special characters");

      if (!errors.includes("Tag contains special characters.")) {
        setErrors([""]);
        setErrors((prevErrors) => [
          ...prevErrors,
          "Tag contains special characters.",
        ]);
      }
      return;
    }

    if (tags.includes(newTag)) {
      console.log("found a duplicate tag");

      if (!errors.includes("Found a duplicate Tag.")) {
        setErrors([""]);
        setErrors((prevErrors) => [...prevErrors, "Found a duplicate Tag."]);
      }
      return;
    }

    if (!newTag) {
      return setEditing(false);
    }

    if (newTag.length > 20) {
      console.log("the tag should be between 1 and 20 characters");

      if (!errors.includes("The tag should be between 1 and 20 characters")) {
        setErrors([""]);
        setErrors((prevErrors) => [
          ...prevErrors,
          "The tag should be between 1 and 20 characters",
        ]);
      }
      return;
    }

    setTags((prevTags) => [...prevTags, newTag]);
    setNewTag("");
    setErrors([""]);
    setEditing(false);
  }

  //-------------------------------------CONTENT DISPLAY STUFF-------------------------------------

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    setDragOver(true); // Set drag over state to true
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    const isOutside =
      x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;

    if (isOutside) {
      setDragOver(false); // Only set false if really outside
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior
    setDragOver(false);
    const files = e.dataTransfer.files[0];
    setFile(files); // Update state with dropped files
    setWrongFormat(false);
    console.log(file);
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setWrongFormat(false);
    setFile(file);
  }

  function handleThumb() {
    if (file?.type.startsWith("image/")) {
      const fileUrl = URL.createObjectURL(file);
      setThumb(fileUrl);
    } else if (file?.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        video.currentTime = 0;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          console.error("Could not get canvas context");
          return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        video.onseeked = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageUrl = canvas.toDataURL("image/png");

          if (imageUrl.startsWith("data:image/png;base64,")) {
            setThumb(imageUrl);
          } else {
            console.error("Invalid base64 image string:", imageUrl);
          }

          console.log(`File selected: ${file.name}`);
        };
      };
    } else {
      setThumb("");
      setWrongFormat(true);
    }
  }

  useEffect(() => {
    if (file) {
      handleThumb();
    }
  }, [file]);

  //-------------------------------------CONTENT DISPLAY STUFF-------------------------------------

  return (
    <>
      <div className="mx-[12%]">
        <div
          className={`bg-primary mt-10 rounded-[20px] flex flex-col justify-center items-center text-center h-[40vh] bg-cover bg-center
            ${dragOver && "bg-gradient"} ${
            thumb != "" ? "" : "bg-upload"
          } transition-all duration-600`}
          style={thumb ? { backgroundImage: `url(${thumb})` } : undefined}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div
            className={`${
              thumb && !dragOver && "bg-[rgba(0,0,0,0.5)]"
            } rounded-[20px] w-full h-[100%] flex justify-center items-center`}
          >
            <div className="mx-[33%] z-10">
              <h1
                className={`font-bold text-2xl ${
                  dragOver ? "text-primary" : "text-accent"
                } transition-all duration-600`}
              >
                {dragOver
                  ? "Drop It Like BeHappy🔥"
                  : wrongFormat
                  ? "Wrong format"
                  : "Įmeskite savo vaizdo įrašą"}
              </h1>
              <Button
                className={`w-full rounded-[20px] bg-gradient text-white mt-3 ${
                  dragOver && "hidden"
                } transition-all duration-600`}
                onClick={handleButtonClick}
              >
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

              <p className="mt-1 text-primary">{file?.name}</p>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
          </div>
        </div>

        <NavUser
          className="my-5"
          textColor="text-primary"
          USER={
            user || {
              name: "Arturka",
              image: "/other/default-profile-icon.png",
            }
          }
        />

        <textarea
          placeholder="Įveskite aprašymą čia..."
          className="bg-primary text-primary p-3 pb-10 rounded-[20px] w-full h-21 resize-none scrollbar-thin scrollbar-thumb-primary"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>

        <p className="mt-3">Galite pridėti hashtag'us čia:</p>

        <div className=" flex flex-wrap gap-x-4 items-center">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="rounded-[20px] bg-primary px-2 pl-6 w-fit font-bold mt-2"
            >
              {"#"}
              {tag}{" "}
              <span>
                <Button onClick={() => handleTagDelete(tag)}>
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
            className={`bg-green-500 p-3 px-10 rounded-[20px] mt-2 ${
              editing && "hidden"
            }`}
            onClick={() => setEditing(true)}
          >
            <Image src="/icons/+.svg" width={12} height={12} alt="add" />
          </Button>

          <div
            className={`bg-green-500 rounded-[20px] flex mt-2 ${
              !editing && "hidden"
            }`}
          >
            <Button
              className="bg-transparent"
              onClick={() => handleTagAdd(newTag)}
            >
              {" "}
              <Image src="/icons/+.svg" width={12} height={12} alt="add" />{" "}
            </Button>
            <p className="bg-green-700 flex justify-center items-center pl-2 text-xl font-bold">
              #
            </p>
            <Input
              className="border-none bg-green-700 rounded-tl-none rounded-tr-[20px] rounded-bl-none rounded-br-[20px]"
              placeholder="artur"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
          </div>
        </div>
        {errors.map((error) => (
          <p key={error} className="mt-1 text-red-500">
            {error}
          </p>
        ))}
        <p className="mt-1">(Galite pridėti iki 5 hashtag'ų)</p>

        {loading && file ? (
          file.type.startsWith("video/") ? (
            <ProgressBar
              progress={progress}
              bytes={bytesUploaded}
              fileSize={file.size}
              type={"video"}
            />
          ) : (
            <ProgressBar
              progress={progress}
              bytes={bytesUploaded}
              fileSize={file.size}
              type={"image"}
            />
          )
        ) : (
          <Button
            onClick={handleUpload}
            className="w-full bg-gradient text-white h-[2.5rem] dark:text-black rounded-[20px] mt-5 text-1xl font-bold"
          >
            ĮKELTI
          </Button>
        )}
      </div>
    </>
  );
};

export default page;
