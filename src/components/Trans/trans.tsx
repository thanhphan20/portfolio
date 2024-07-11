"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { text, curve, translate } from "./anim";
import styles from "./style.module.scss";

const routes = {
  "/": "Home",
  "/blogs": "Blogs",
  "/about": "About",
  "/project": "Projects",
};

const anim = (variants: string) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

export default function Curve({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  let routeName = routes[pathname];
  if (!routeName && pathname.startsWith("/blogs/")) {
    routeName = "Blog Post";
  }

  return (
    <div className={styles.curve}>
      <motion.p key={pathname} className={styles.route} {...anim(text)}>
        {routeName}
      </motion.p>
      {dimensions.width !== 0 && <SVG {...dimensions} />}
      {children}
    </div>
  );
}

const SVG = ({ height, width }: { height: number; width: number }) => {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  return (
    <motion.svg {...anim(translate)} className={styles.svg}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
