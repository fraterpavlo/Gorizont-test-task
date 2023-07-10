import Link from "next/link";
import styles from "../styles/A.module.css";
import React from "react";

export default function A({ text, href }) {
  return (
    <Link href={href} className={styles.link}>
      {text}
    </Link>
  );
}
