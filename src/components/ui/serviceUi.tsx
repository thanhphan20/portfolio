"use client";

import { useRef, useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function ServiceUi({
  title,
  description,
  items,
  i,
  length,
}: {
  title: string;
  description: string;
  items: Array<string>;
  i: number;
  length: number;
}) {
  const serviceUi = useRef(null);
  const heading = useRef(null);
  const body = useRef(null);
  const services = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: serviceUi.current,
      start: "150px bottom",
      animation: gsap
        .timeline()
        .to(
          heading.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0
        )
        .to(
          body.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0.2
        )
        .to(
          services.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0.5
        ),

      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, [serviceUi]);

  return (
    <div
      ref={serviceUi}
      className="sticky top-0 border-t border-t-secondary-300 h-[40vh] bg-[#141414]"
      style={{ top: `calc(20vh + ${i * 5.75}rem)`,  marginBottom: `${((length - i) * 5.75)}rem` }}
    >
      <div className="flex flex-row items-start gap-48 relative origin-top h-full w-full rounded-2xl">
        <div className="space-y-6 w-1/2">
          <div className="space-y-3 2xl:space-y-10">
            <h3
              ref={heading}
              className="2xl:text-6xl font-semibold leading-tight translate-y-10 opacity-0"
            >
              {title}
            </h3>
            <p
              ref={body}
              className="max-w-md xl:max-w-2xl text-body-1 2xl:text-3xl translate-y-10 opacity-0"
            >
              {description}
            </p>
          </div>
        </div>
        <div
          ref={services}
          className="w-1/2 select-none leading-[2.3rem] text-secondary-500 md:leading-[2.5rem] lg:leading-[3.4rem] translate-y-10 opacity-0"
        >
          {items.map((item, index) => {
            return (
              <p
                key={index}
                className="font-general text-special 2xl:text-6xl font-extrabold mb-8"
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
