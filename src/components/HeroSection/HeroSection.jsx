
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  UsersRound,
  Activity,
  Heart,
} from "lucide-react";
import "./HeroSection.css";

const benefits = [
  {
    icon: UsersRound,
    title: "Personalised Care",
    subtitle: "PATIENT FIRST",
  },
  {
    icon: ShieldCheck,
    title: "Evidence Based",
    subtitle: "PROVEN APPROACH",
  },
  {
    icon: Activity,
    title: "Better Movement",
    subtitle: "STRONGER LIVING",
  },
  {
    icon: Heart,
    title: "Lasting Results",
    subtitle: "CARE THAT MATTERS",
  },
];

const heroCopy = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const createFadeUp = (reduceMotion) => ({
  hidden: {
    opacity: 0,
    y: reduceMotion ? 0 : 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const fadeUp = createFadeUp(reduceMotion);

  return (
    <section
      className="rehabics-hero"
      aria-labelledby="rehabics-hero-title"
    >
      <div
        className="rehabics-hero__image"
        aria-hidden="true"
      />

      <div
        className="rehabics-hero__overlay"
        aria-hidden="true"
      />

      <div
        className="rehabics-hero__grain"
        aria-hidden="true"
      />

      <div className="rehabics-hero__content">
        <motion.div
          className="rehabics-hero__copy"
          variants={heroCopy}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="rehabics-hero__eyebrow"
            variants={fadeUp}
          >
            <span
              className="rehabics-hero__eyebrow-line"
              aria-hidden="true"
            />

            <span>PHYSIOTHERAPY</span>

            <span
              className="rehabics-hero__dot"
              aria-hidden="true"
            >
              /
            </span>

            <span>REHABILITATION</span>
          </motion.div>

          <motion.h1
            id="rehabics-hero-title"
            className="rehabics-hero__title"
            variants={fadeUp}
          >
            MOVE BETTER.
            <span>LIVE STRONGER.</span>
          </motion.h1>

          <motion.p
            className="rehabics-hero__description"
            variants={fadeUp}
          >
            Personalised physiotherapy and rehabilitation
            to reduce pain, restore movement and help you
            return to the activities you love.
          </motion.p>

          <motion.div
            className="rehabics-hero__actions"
            variants={fadeUp}
          >
            <Link
              to="/contact"
              className="rehabics-hero__primary"
            style={{color:"black"}}>
              <span>Book an Appointment</span>
              <ArrowRight
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/approach"
              className="rehabics-hero__secondary"
            >
              <span
                className="rehabics-hero__play"
                aria-hidden="true"
              >
                <ArrowUpRight
                  size={19}
                  strokeWidth={1.7}
                />
              </span>

              <span>Discover Our Approach</span>
            </Link>
          </motion.div>

          <motion.div
            className="rehabics-hero__note"
            variants={fadeUp}
          >
            <span
              className="rehabics-hero__note-line"
              aria-hidden="true"
            />

            <span>
              YOUR RECOVERY. YOUR PACE. YOUR POTENTIAL.
            </span>
          </motion.div>
        </motion.div>

        <motion.aside
          className="rehabics-hero__side-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            delay: reduceMotion ? 0 : 0.65,
          }}
          aria-label="Our philosophy"
        >
          <span>MOVE WITH CONFIDENCE</span>
          <span>RECOVER WITH PURPOSE</span>
          <span>LIVE WITHOUT LIMITS</span>
        </motion.aside>
      </div>


      <div
        className="rehabics-hero__scroll"
        aria-hidden="true"
      >
        <span>SCROLL TO EXPLORE</span>
        <span className="rehabics-hero__scroll-line" />
      </div>
    </section>
  );
}
