"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Preloader from "@/components/Preloader/preloader";
import { AnimatePresence } from "framer-motion";
import Indicator from "@/components/indicator";

export default function Home() {
  const container = useRef(null);
  const sectionRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPath, setIsPath] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);

        document.body.style.cursor = "default";

        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  useEffect(() => {
    const isExactHomePath = (path: string) => {
      return path === "";
    };
    const currentURL = window.location.href;
    const pathname = currentURL.split("/")[3];
    if (isExactHomePath(pathname)) {
      setIsPath(true);
    } else {
      setIsPath(false);
    }
  }, []);

  return (
    <main ref={container} className="relative flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading && isPath && <Preloader />}
      </AnimatePresence>
      <Hero ref={(el) => (sectionRefs.current[0] = el)} />
      <Services ref={(el) => (sectionRefs.current[1] = el)} />
      <Projects ref={(el) => (sectionRefs.current[2] = el)} />
      <Contact ref={(el) => (sectionRefs.current[3] = el)} />
      <Indicator />
    </main>
  );
}
