import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = ({ header }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <h1
      className="text-3xl font-bold mb-8 dark:text-white"
      data-aos="fade-down"
    >
      {header ? header : ""}
    </h1>
  );
};

export default Header;
