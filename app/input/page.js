import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <textarea name="inputField" className={styles.input} required />
      <Link href="/" style={{ width: "80%" }}>
        <button className={styles.button}>Generate Hero</button>
      </Link>
    </div>
  );
};

export default Home;
