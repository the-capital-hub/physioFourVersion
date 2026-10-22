
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import "./Navbar.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Conditions", path: "/conditions" },
  { label: "Services", path: "/services" },
  { label: "Our Approach", path: "/approach" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const panelVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : -12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.24,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -8,
      transition: {
        duration: reduceMotion ? 0 : 0.16,
      },
    },
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          {/* Brand */}
          <Link
            to="/"
            className="navbar-brand"
            aria-label="Rehabics home"
            onClick={closeMenu}
          >
            <span className="navbar-logo-mark">
              <Activity size={24} strokeWidth={2.1} />
            </span>

            <span className="navbar-brand-copy">
              <span className="navbar-brand-name">
                REHABICS<span className="navbar-brand-symbol">®</span>
              </span>

              <span className="navbar-brand-tagline">
                PHYSIOTHERAPY & PERFORMANCE
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            className="navbar-desktop-links"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `navbar-link${isActive ? " active" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>

                    {isActive && (
                      <motion.span
                        className="navbar-active-indicator"
                        layoutId="rehabics-active-link"
                        transition={{
                          duration: reduceMotion ? 0 : 0.22,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="navbar-actions">
            <Link to="/auth" className="navbar-login">
              Login
            </Link>

            <Link to="/appointment" className="navbar-cta">
              <span>Book Appointment</span>
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="navbar-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navbar-mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{
                  opacity: 0,
                  rotate: reduceMotion ? 0 : -35,
                }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{
                  opacity: 0,
                  rotate: reduceMotion ? 0 : 35,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.15,
                }}
                className="navbar-toggle-icon"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              className="navbar-mobile-backdrop"
              aria-label="Close navigation"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.18,
              }}
            />

            <motion.div
              id="navbar-mobile-menu"
              className="navbar-mobile-menu"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="navbar-mobile-eyebrow">
                <span>EXPLORE REHABICS</span>
                <span className="navbar-mobile-count">
                  0{navItems.length}
                </span>
              </div>

              <nav
                className="navbar-mobile-links"
                aria-label="Mobile navigation"
              >
                {navItems.map((item, index) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `navbar-mobile-link${isActive ? " active" : ""}`
                    }
                  >
                    <span className="navbar-mobile-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="navbar-mobile-label">
                      {item.label}
                    </span>

                    <ArrowUpRight
                      className="navbar-mobile-arrow"
                      size={19}
                      strokeWidth={1.8}
                    />
                  </NavLink>
                ))}
              </nav>

              <div className="navbar-mobile-actions">
                <Link
                  to="/auth"
                  className="navbar-mobile-login"
                  onClick={closeMenu}
                >
                  <span>Login to your account</span>
                  <ArrowUpRight size={18} />
                </Link>

                <Link
                  to="/appointment"
                  className="navbar-mobile-cta"
                  onClick={closeMenu}
                >
                  <span>Book Appointment</span>
                  <ArrowUpRight size={19} />
                </Link>
              </div>

              <div className="navbar-mobile-bottom">
                <span className="navbar-mobile-bottom-mark">
                  <Activity size={17} />
                </span>
                <span>MOVE BETTER. LIVE STRONGER.</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
