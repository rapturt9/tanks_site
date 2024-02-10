// components/Hero.js
"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Hero.module.css";

const generateShadowEffect = (angle, color, length) => {
  const shadowEffect = Array.from(
    { length },
    (_, i) =>
      `${(i + 1) * Math.cos(angle)}px ${
        (i + 1) * Math.sin(angle)
      }px 1px ${color}`
  ).join(", ");
  return `
    ${shadowEffect},
    1px 18px 6px rgba(16, 16, 16, 0.4),
    1px 22px 10px rgba(16, 16, 16, 0.2),
    1px 25px 35px rgba(16, 16, 16, 0.2),
    1px 30px 60px rgba(16, 16, 16, 0.4)
  `;
};

// Function to darken a color
const darkenColor = (color, percentage) => {
  color = color.substring(1); // Remove "#"
  const num = parseInt(color, 16);

  const amt = Math.round(2.55 * percentage);

  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
};

function genRandom(arr) {
  return arr.map((val) => Math.floor(Math.random() * val.length));
}

const mainColor = "#FFFFFF";
const defaultShadowColor = darkenColor(mainColor, -50);

const colors = ["tanks"];
const MOVEMENT_SENSITIVITY = 200;
const headers = [["Ultimate Tank", "Showdown"]];
const descriptions = ["Victory awaits the skilled."];
const CTAs = ["Fight Now"];

const Hero = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [angle, setAngle] = useState(0);
  const [buttonColor, setButtonColor] = useState("#017CD1");
  const [powerShadowColor, setPowerShadowColor] = useState(
    darkenColor(buttonColor, -50)
  );
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const [random, setRandom] = useState(
    genRandom([headers, descriptions, CTAs])
  );
  const [windowHeight, setWindowHeight] = useState(0);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 4));

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 4));
  }, []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleMouseMove = (event) => {
      const x = event.clientX - window.innerWidth / 4;
      const y = event.clientY - window.innerHeight / 2;
      setAngle(Math.PI + Math.atan2(y, x));
      setBackgroundPosition(
        `${-event.clientX / MOVEMENT_SENSITIVITY}px ${
          -event.clientY / MOVEMENT_SENSITIVITY
        }px`
      );
    };

    const handleResize = (event) => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      className={styles.hero}
      style={{
        backgroundImage: `url(/${colors[colorIndex]}/background${randomNum}.png)`,
        backgroundPosition,
      }}
    >
      <div
        className={styles.content}
        style={
          windowHeight < 400
            ? {
                bottom: "3em",
              }
            : {
                bottom: "5em",
              }
        }
      >
        <h1
          style={{
            color: mainColor,
            textShadow: generateShadowEffect(angle, defaultShadowColor, 6),
          }}
        >
          {headers[random[0]][0]}
          <br />
          <span
            style={{
              color: buttonColor,
              textShadow: generateShadowEffect(angle, powerShadowColor, 6),
            }}
          >
            {headers[random[0]][1]}
          </span>
        </h1>
        <p
          style={{
            color: mainColor,
            textShadow: generateShadowEffect(angle, defaultShadowColor, 3),
          }}
        >
          {descriptions[random[1]]}
        </p>
        <button
          style={{
            backgroundColor: buttonColor,
            color: mainColor,
            boxShadow: generateShadowEffect(angle, powerShadowColor, 4),
          }}
          className={styles.button}
          onClick={() => {
            window.open(
              "https://store.steampowered.com/app/1660910/Tanks_The_Crusades/",
              "_blank"
            );
          }}
        >
          {CTAs[random[2]]}
        </button>
      </div>
      {windowHeight > 650 && (
        <img
          src={`/${colors[colorIndex]}/graphic.png`}
          className={styles.graphic}
          alt={"Graphic Image"}
          onError={(e) => {
            console.log("error loading ", e.target.src);
            setRandom([0, 0, 0]);
          }}
        />
      )}
    </div>
  );
};

export default Hero;
