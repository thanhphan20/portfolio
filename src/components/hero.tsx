"use client";

import { gsap } from "gsap";
import { useRef, useEffect, forwardRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfiniteHorizontalScroll from "@/components/ui/infinite";
import { motion, useTransform } from "framer-motion";

const Hero = forwardRef((props, ref) => {
  const imgRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const { clientX, clientY } = event;
      const xPercent = (clientX / window.innerWidth - 0.5) * 100;
      const yPercent = (clientY / window.innerHeight - 0.5) * 100;

      gsap.to(imgRef.current, {
        duration: 0.5,
        x: xPercent,
        y: yPercent,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="h-screen flex flex-col gap-36 -mt-[5%] justify-center px-[10%]"
    >
      <div className="grid-gap spacing flex grid-cols-2 flex-col md:grid">
        <article className="">
          <h2 className="text-2xl md:text-4xl 2xl:text-5xl" data-fade="1">
            Hi!
          </h2>
          <h1 className="mt-1 text-3xl md:text-5xl 2xl:text-6xl" data-fade="2">
            You can call me{" "}
            <span className="transition-colors bg-gradient-to-tr from-primary-300/40 via-primary-300/40 to-primary-400/40 dark:from-primary-300 dark:to-primary-400">
              Carter
            </span>
          </h1>
          <p
            className="mt-2 max-w-4xl leading-relaxed text-gray-white md:mt-3 text-sm md:text-base 2xl:text-lg"
            data-fade="2"
          >
            Full-stack Engineer
          </p>
          <p
            className="mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6 md:text-lg 2xl:text-xl"
            data-fade="3"
          >
            Empowering startups with custom web experiences that drive success.
            I bring projects from ideation to launch, ensuring a seamless
            journey with lasting impact.
          </p>
          <div data-fade="5" className="mt-8 flex flex-wrap gap-4 md:!text-lg">
            <div className="group relative">
              <div className="absolute -inset-0.5 animate-tilt rounded blur bg-gradient-to-r from-primary-300 to-primary-400 dark:from-primary-200 dark:via-primary-300 opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
              <a
                className="inline-flex rounded px-4 py-2 font-bold border border-gray-300 shadow-sm dark:border-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 scale-100 hover:scale-[1.03] active:scale-[0.97] motion-safe:transform-gpu motion-reduce:hover:scale-100 motion-reduce:hover:brightness-90 transition duration-100 animate-shadow bg-white text-gray-800 disabled:bg-gray-200 dark:bg-dark  dark:disabled:bg-gray-700"
                href="/blogs"
              >
                Read the blog
              </a>
            </div>
            <a
              className="inline-flex rounded px-4 py-2 font-bold border border-gray-300 shadow-sm dark:border-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 scale-100 hover:scale-[1.03] active:scale-[0.97] motion-safe:transform-gpu motion-reduce:hover:scale-100 motion-reduce:hover:brightness-90 transition duration-100 animate-shadow bg-white text-gray-800 disabled:bg-gray-200 dark:bg-dar dark:disabled:bg-gray-700"
              href="/#about"
            >
              Learn more about me
            </a>
          </div>
          <div
            data-fade="6"
            className="mt-4 flex flex-wrap gap-4 gap-y-2 md:mt-8"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="../../public/cv.pdf"
              className="inline-flex items-center gap-1 text-sm font-medium md:text-base text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-primary-300 transition-colors cursor-newtab"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="shrink-0"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="96"
                  height="96"
                  x="96"
                  y="112"
                  fill="none"
                  rx="16"
                  ry="16"
                ></rect>
                <path d="M468 112h-52v304a32 32 0 0032 32 32 32 0 0032-32V124a12 12 0 00-12-12z"></path>
                <path d="M431.15 477.75A64.11 64.11 0 01384 416V44a12 12 0 00-12-12H44a12 12 0 00-12 12v380a56 56 0 0056 56h342.85a1.14 1.14 0 00.3-2.25zM96 208v-96h96v96zm224 192H96v-32h224zm0-64H96v-32h224zm0-64H96v-32h224zm0-64h-96v-32h96zm0-64h-96v-32h96z"></path>
              </svg>
              <span>Resume</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/cthanhphan/"
              className="inline-flex items-center gap-1 text-sm font-medium md:text-base group text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-primary-300 transition-colors cursor-newtab"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                role="img"
                viewBox="0 0 24 24"
                className="shrink-0"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title></title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
              <span>@Công Thành Phan</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/thanhphan20"
              className="inline-flex items-center gap-1 text-sm font-medium md:text-base text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-primary-300 transition-colors cursor-newtab"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                role="img"
                viewBox="0 0 24 24"
                className="shrink-0"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title></title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
              </svg>
              <span>thanhphan20</span>
            </a>
          </div>
        </article>
        <div
          className="relative rounded-md min-h-96"
          style={{
            backgroundImage: `url("/avatar.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="absolute top-0 left-0 min-h-[28rem] w-full">
            <img
              ref={imgRef}
              className="h-full w-full object-cover"
              src="/cat.png"
            />
          </div>
        </div>
      </div>
      <InfiniteHorizontalScroll />
    </section>
  );
});

export default Hero;
