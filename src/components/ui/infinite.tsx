"use client";

import { icons } from "@/lib/icon";

const InfiniteHorizontalScroll = () => {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {icons.map((icon, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: icon }} />
        ))}
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        {icons.map((icon, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: icon }} />
        ))}
      </ul>
    </div>
  );
};

export default InfiniteHorizontalScroll;
