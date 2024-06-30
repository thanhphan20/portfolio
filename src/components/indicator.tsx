import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: "home" },
  { id: "services" },
  { id: "projects" },
  { id: "contact" },
];

const Indicator = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });
  });

  return (
    <ul className="fixed left-0 top-1/2 transform -translate-y-1/2">
      {sections.map((section, index) => (
        <li key={section.id} className="block w-3 h-3 mb-8 ml-4 relative">
          <a
            href={`#${section.id}`}
            className="block relative w-full h-full cursor-pointer no-underline"
          >
            <span
              className={`absolute h-1 ${
                activeIndex === index ? "w-12 ml-5" : "w-6 ml-2"
              } transition-all delay-1000 border-none bg-white left-1/2 top-1/2 rounded-3xl transform -translate-x-1/2 -translate-y-1/2`}
            ></span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Indicator;
