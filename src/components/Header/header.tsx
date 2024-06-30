"use client";
import styles from "./style.module.scss";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import Link from "next/link";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={styles.headerLogo}>
          <Link href='/' className={styles.logo}>
            <p className={styles.copyright}>©</p>
            <div className={styles.name}>
              <p className={styles.codeBy}>Code by</p>
              <p className={styles.carter}>Carter</p>
              <p className={styles.phan}>Phan</p>
            </div>
          </Link>
      </div>

      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={styles.button}
      >
        <div
          className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}
        ></div>
        <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
      </div>
    </>
  );
}
