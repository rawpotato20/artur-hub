import React from "react";
import TagCard from "./TagCard";

const TAGS = ["artur", "bobinski", "bobinciuk", "artreus"];

const Tags = () => {
  return (
    <>
      <div className="space-x-4">
        {TAGS.map((tag) => (
          <TagCard key={tag} tag={tag} />
        ))}
      </div>
    </>
  );
};

export default Tags;
