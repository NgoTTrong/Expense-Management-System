import React from "react";
import empty from "../../static/images/empty.png";
const Empty = () => {
  return (
    <section className="w-full flex flex-col items-center gap-4">
      <img src={empty} alt="" className="h-[200px]" />
      <span className="text-primary font-medium">
        You don't have any expenses!
      </span>
    </section>
  );
};

export default Empty;
