import React from "react";
import TagCard from "./TagCard";

const TAGS = ["artur", "bobinski", "bobinciuk", "artreus"];

const Tags = ({ tags, className }: { tags?: string[]; className?: string }) => {
  return (
    <>
      <div className={`space-x-4 ${className}`}>
        {tags
          ? tags.map((tag) => <TagCard key={tag} tag={tag} />)
          : TAGS.map((tag) => <TagCard key={tag} tag={tag} />)}
      </div>
    </>
  );
};

export default Tags;
