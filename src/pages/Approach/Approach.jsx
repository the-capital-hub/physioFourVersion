
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  ClipboardCheck,
  Target,
  ChartNoAxesColumnIncreasing,
  UsersRound,
  ShieldCheck,
  Heart,
  Activity,
} from "lucide-react";
import "./Approach.css";

const steps = [
  {
    number: "01",
    title: "Understand",
    text: "We take the time to discuss your concerns, history, daily activities and goals.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Assess",
    text: "A thorough assessment helps build a clearer understanding of your current situation.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Plan",
    text: "We explore suitable options and develop an individual plan based on your needs and goals.",
    icon: Target,
  },
  {
    number: "04",
    title: "Progress",
    text: "We review your response and adapt the approach to help you keep moving forward.",
    icon: ChartNoAxesColumnIncreasing,
  },
];

const values = [
  {
    title: "Individual Care",
    text: "We recognise that every person is different and tailor our approach to individual needs.",
    icon: UsersRound,
  },
  {
    title: "Evidence Informed",
    text: "We value current evidence, clinical reasoning and thoughtful decision making.",
    icon: ShieldCheck,
  },
  {
    title: "Supportive Environment",
    text: "We aim to create a respectful, encouraging space for your rehabilitation journey.",
    icon: Heart,
  },
  {
    title: "Meaningful Outcomes",
    text: "We focus on practical goals that connect with everyday activities and personal priorities.",
    icon: Activity,
  },
];

const Approach = () => {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: reduceMotion ? 0 : 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <main className="rh-approach">
      {/* HERO */}
      <section className="rh-approach-hero">
        <div className="rh-approach-hero__image" />
        <div className="rh-approach-hero__overlay" />

        <div className="rh-approach-container rh-approach-hero__content">
          <motion.div {...reveal}>
            <p className="rh-approach-eyebrow">
              <span />
              OUR APPROACH
            </p>

            <h1 className="rh-approach-title">
              Understand.
              <br />
              Guide.
              <br />
              <em>Move Forward.</em>
            </h1>

            <p className="rh-approach-lead">
              A thoughtful, individual approach to physiotherapy, built around
              your goals, your lifestyle and what matters to you.
            </p>

            <div className="rh-approach-actions">
              <a href="#our-process" className="rh-approach-button">
                Our process <ArrowRight size={18} />
              </a>

              <Link to="/contact" className="rh-approach-text-link">
                Get in touch <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="rh-approach-hero__side">
          <span>PEOPLE</span>
          <span>PROCESS</span>
          <span>PROGRESS</span>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="rh-approach-philosophy">
        <div className="rh-approach-container rh-approach-philosophy__grid">
          <motion.div {...reveal}>
            <p className="rh-approach-eyebrow">
              <span />
              OUR PHILOSOPHY
            </p>

            <h2 className="rh-approach-title">
              More than treatment.
              <br />
              <em>A broader perspective.</em>
            </h2>
          </motion.div>

          <motion.div {...reveal}>
            <p className="rh-approach-light-text">
              At Rehabics, we believe in a considered and individual approach
              to physiotherapy. Our focus is not just on the immediate concern,
              but also on the bigger picture: your movement, your confidence
              and your long term goals.
            </p>

            <p className="rh-approach-light-text">
              We take the time to understand your situation, explore suitable
              options and support you in a way that fits your needs and
              lifestyle.
            </p>
          </motion.div>

          <div className="rh-approach-philosophy__aside">
            <span>INDIVIDUAL CARE</span>
            <span>MEANINGFUL PROGRESS</span>
            <span>A STRONGER TOMORROW</span>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="rh-approach-process" id="our-process">
        <div className="rh-approach-container">
          <motion.div
            className="rh-approach-section-heading"
            {...reveal}
          >
            <div>
              <p className="rh-approach-eyebrow">
                <span />
                OUR PROCESS
              </p>

              <h2 className="rh-approach-title">
                A clear process.
                <br />
                <em>An individual journey.</em>
              </h2>
            </div>

            <p className="rh-approach-muted-text">
              Every person and every situation is different. Our process is
              designed to provide clarity, guidance and support at each stage,
              so you can move forward with confidence.
            </p>
          </motion.div>

          <div className="rh-approach-steps">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  className="rh-approach-step"
                  key={step.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : index * 0.08,
                  }}
                >
                  <div className="rh-approach-step__top">
                    <span>{step.number}</span>
                    <Icon size={24} strokeWidth={1.35} />
                    <ArrowRight
                      className="rh-approach-step__arrow"
                      size={19}
                    />
                  </div>

                  <div className="rh-approach-rule" />

                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="rh-approach-values">
        <div className="rh-approach-container">
          <motion.div
            className="rh-approach-section-heading"
            {...reveal}
          >
            <div>
              <p className="rh-approach-eyebrow">
                <span />
                OUR VALUES
              </p>

              <h2 className="rh-approach-title">
                Principles
                <br />
                <em>that guide us.</em>
              </h2>
            </div>

            <p className="rh-approach-light-text">
              Our approach is shaped by core values that guide how we work
              with every individual.
            </p>

            <div className="rh-approach-values__aside">
              <span>PEOPLE FIRST</span>
              <span>CONSIDERED CARE</span>
              <span>POSITIVE IMPACT</span>
            </div>
          </motion.div>

          <div className="rh-approach-values__grid">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  className="rh-approach-value"
                  key={value.title}
                  {...reveal}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : index * 0.07,
                  }}
                >
                  <Icon size={29} strokeWidth={1.4} />

                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="rh-approach-cta">
        <div className="rh-approach-cta__image" />
        <div className="rh-approach-cta__overlay" />

        <div className="rh-approach-container rh-approach-cta__grid">
          <motion.div {...reveal}>
            <p className="rh-approach-eyebrow">
              <span />
              YOUR NEXT STEP
            </p>

            <h2 className="rh-approach-title">
              Let’s work towards
              <br />
              your goals <em>together.</em>
            </h2>

            <p className="rh-approach-lead">
              Start with a conversation about your concerns, your goals and
              the support that may be right for you.
            </p>

            <div className="rh-approach-actions">
              <Link to="/contact" className="rh-approach-button">
                Get in touch <ArrowRight size={18} />
              </Link>

              <Link to="/services" className="rh-approach-text-link">
                View our services <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.div>

          <div className="rh-approach-cta__aside">
            <span>UNDERSTAND TODAY</span>
            <span>BUILD TOMORROW</span>
            <span>MOVE FORWARD</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Approach;
