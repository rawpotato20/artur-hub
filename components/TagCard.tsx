import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const TagCard = ({ tag }: { tag: string }) => {
  return (
    <>
      <Button className="bg-primary rounded-[10px] text-primary py-1 px-4 mr-4 mt-2">
        <Link href="./">{`#${tag}`}</Link>
      </Button>
    </>
  );
};

export default TagCard;
