import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function AnimateHeader({ children }) {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);
  return (
    <motion.div
      initial={{ y: 0 }}
      className="fixed top-0 w-full z-[100] left-0"
      animate={{
        y: scrollDirection === "down" ? "-100%" : 0, // Slide in if open or scrolling down, slide out if closed and scrolling up
      }}
      transition={{ duration: 0.5, ease: "easeInOut", type: "spring" }} // Animation duration
    >
      {children}
    </motion.div>
  );
}

export default AnimateHeader;
