
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <motion.button
      type="button"
      className="rv3ScrollTop"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 12, scale: 0.9 }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.22,
        ease: "easeOut",
      }}
      style={{
        pointerEvents: visible ? "auto" : "none",
      }}
      tabIndex={visible ? 0 : -1}
      whileHover={visible ? { y: -3 } : {}}
      whileTap={visible ? { scale: 0.94 } : {}}
    >
      <ArrowUp size={22} strokeWidth={2} />
    </motion.button>
  );
}
