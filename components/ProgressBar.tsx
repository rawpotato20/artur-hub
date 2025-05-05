import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ProgressBar({
  progress,
  bytes,
  fileSize,
  type,
}: {
  progress: number;
  bytes: number;
  fileSize: number;
  type: "video" | "image";
}) {
  const [dots, setDots] = useState("");

  const mb = (bytes / 1024 / 1024).toFixed(2);
  const left = (fileSize / 1024 / 1024).toFixed(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {type === "video" ? (
        <>
          <div className="w-full h-[2.5rem] bg-primary mt-3 rounded-[20px]">
            <div className="h-[2.5rem] flex items-center m-auto mx-[15px]">
              <div
                className="h-[1rem] w-full bg-gradient transition-all rounded-[20px] duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between mx-[20px] font-bold mt-1">
            <p>{`${progress}%`}</p>
            <p>Uploading{dots}</p>
            <p>{`${mb}MB / ${left}MB`}</p>
          </div>
        </>
      ) : (
        <Button className="w-full bg-gradient text-white h-[2.5rem] dark:text-black rounded-[20px] mt-5 text-1xl font-bold">
          Uploading{dots}
        </Button>
      )}
    </>
  );
}
