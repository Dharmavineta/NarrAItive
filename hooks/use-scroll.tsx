import React, { useEffect, useState } from "react";

const UseScroll = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return toggle;
};

export default UseScroll;
