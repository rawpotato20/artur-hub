import React from "react";
import TagCard from "./TagCard";

const TAGS = [
  "artur",
  "bobinski",
  "bobinciuk",
  "artreus",
  "arturdd",
  "bobinskidd",
  "bobinciukdd",
  "artreusdd",
  "arturll",
  "bobinskill",
  "bobinciukll",
  "artreusll",
];

const Tags = ({ tags, className }: { tags?: string[]; className?: string }) => {
  return (
    <>
      <div className={`${className}`}>
        {tags
          ? tags.map((tag) => <TagCard key={tag} tag={tag} />)
          : TAGS.map((tag) => <TagCard key={tag} tag={tag} />)}
      </div>
    </>
  );
};

export default Tags;
