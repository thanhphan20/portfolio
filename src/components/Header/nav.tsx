import React, { useState } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "./anim";
import Link from "./link";
import { title } from "process";

const navItems = [
  {
    title: "Home",
    href: "/#home",
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Projects",
    href: "/#projects",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
];

export default function index() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <Link
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              ></Link>
            );
          })}
        </div>
        <div className={styles.footer}>
          <a>Gmail</a>
          <a>Github</a>
          <a>LinkedIn</a>
        </div>
      </div>
    </motion.div>
  );
}
