
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  Bone,
  Dumbbell,
  HeartPulse,
  MoveUpRight,
  PersonStanding,
  ShieldCheck,
  Target,
  Waves,
} from "lucide-react";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "Musculoskeletal Physiotherapy",
    category: "MOVEMENT AND FUNCTION",
    description:
      "Individualised support for musculoskeletal concerns, movement limitations and everyday functional goals.",
    icon: Bone,
    tags: ["Assessment", "Movement", "Function"],
  },
  {
    number: "02",
    title: "Pain Management",
    category: "UNDERSTAND YOUR PAIN",
    description:
      "Explore strategies to understand pain, improve movement confidence and work towards meaningful daily activities.",
    icon: HeartPulse,
    tags: ["Education", "Guidance", "Daily life"],
  },
  {
    number: "03",
    title: "Sports Rehabilitation",
    category: "RETURN TO ACTIVITY",
    description:
      "A considered rehabilitation approach focused on physical function and a suitable return to sporting activities.",
    icon: Dumbbell,
    tags: ["Strength", "Control", "Performance"],
  },
  {
    number: "04",
    title: "Mobility and Flexibility",
    category: "MOVE WITH CONFIDENCE",
    description:
      "Work towards improving movement, flexibility and confidence with activities that matter to you.",
    icon: PersonStanding,
    tags: ["Mobility", "Flexibility", "Movement"],
  },
  {
    number: "05",
    title: "Strength and Conditioning",
    category: "BUILD YOUR CAPACITY",
    description:
      "Explore suitable exercise guidance designed around your current abilities, goals and functional needs.",
    icon: Activity,
    tags: ["Strength", "Control", "Capacity"],
  },
  {
    number: "06",
    title: "Personalised Recovery Planning",
    category: "YOUR INDIVIDUAL PLAN",
    description:
      "Understand your options and work with a qualified professional to establish relevant goals and review progress.",
    icon: Target,
    tags: ["Personal goals", "Planning", "Progress"],
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    text: "Discuss your concerns, history, daily activities and personal goals.",
  },
  {
    number: "02",
    title: "Plan",
    text: "Explore suitable options following an individual assessment by a qualified professional.",
  },
  {
    number: "03",
    title: "Progress",
    text: "Review your response and adjust the approach according to your needs.",
  },
];

const Services = () => {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: reduceMotion ? 0 : 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <main className="rh-services">
      {/* HERO */}
      <section className="rh-services-hero">
        <div className="rh-services-hero__image" />
        <div className="rh-services-hero__overlay" />

        <div className="rh-services-container rh-services-hero__content">
          <motion.div {...reveal}>
            <p className="rh-services-eyebrow">
              <span />
              REHABICS SERVICES
            </p>

            <h1 className="rh-services-title">
              Care with purpose.
              <br />
              <em>Movement with meaning.</em>
            </h1>

            <p className="rh-services-lead">
              Explore physiotherapy and movement support shaped around your
              individual needs, everyday challenges and goals for the future.
            </p>

            <div className="rh-services-actions">
              <a href="#explore-services" className="rh-services-button">
                Explore our services <ArrowRight size={18} />
              </a>

              <Link to="/approach" className="rh-services-text-link">
                Understand our approach <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="rh-services-hero__footer">
          <span>INDIVIDUAL NEEDS</span>
          <span className="rh-services-line" />
          <span>THOUGHTFUL CARE</span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="rh-services-intro">
        <div className="rh-services-container rh-services-intro__grid">
          <motion.div {...reveal}>
            <p className="rh-services-eyebrow">
              <span />
              A MORE PERSONAL APPROACH
            </p>

            <h2 className="rh-services-title">
              Support that starts
              <br />
              <em>with understanding.</em>
            </h2>
          </motion.div>

          <motion.div {...reveal}>
            <p className="rh-services-body">
              The right approach depends on the individual, their concerns
              and what they want to work towards. Rehabics is built around
              understanding those needs and exploring suitable next steps.
            </p>

            <p className="rh-services-body">
              Explore the services below to learn about different areas of
              physiotherapy and movement support. Your individual plan should
              be discussed with a qualified professional.
            </p>

            <Link to="/conditions" className="rh-services-inline-link">
              Explore conditions <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section
        className="rh-services-list"
        id="explore-services"
      >
        <div className="rh-services-container">
          <motion.div className="rh-services-section-heading" {...reveal}>
            <div>
              <p className="rh-services-eyebrow">
                <span />
                AREAS OF SUPPORT
              </p>

              <h2 className="rh-services-title">
                Find your starting point.
                <br />
                <em>Build your next step.</em>
              </h2>
            </div>

            <p className="rh-services-body">
              Every service begins with understanding your situation and
              exploring options that fit your needs.
            </p>
          </motion.div>

          <div className="rh-services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  className="rh-service-card"
                  key={service.number}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 22 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : (index % 3) * 0.08,
                  }}
                >
                  <div className="rh-service-card__top">
                    <span>{service.number}</span>
                    <Icon size={27} strokeWidth={1.3} />
                  </div>

                  <div className="rh-service-card__rule" />

                  <p className="rh-service-card__category">
                    {service.category}
                  </p>

                  <h3>{service.title}</h3>

                  <p className="rh-service-card__description">
                    {service.description}
                  </p>

                  <div className="rh-service-card__tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="rh-service-card__link"
                    aria-label={`Enquire about ${service.title}`}
                  >
                    Discuss your needs <ArrowUpRight size={18} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="rh-services-process">
        <div className="rh-services-container">
          <motion.div className="rh-services-section-heading" {...reveal}>
            <div>
              <p className="rh-services-eyebrow">
                <span />
                HOW WE MOVE FORWARD
              </p>

              <h2 className="rh-services-title">
                A clear direction.
                <br />
                <em>An individual journey.</em>
              </h2>
            </div>

            <p className="rh-services-body">
              Understanding your needs is the starting point. The next steps
              should reflect your assessment, priorities and goals.
            </p>
          </motion.div>

          <div className="rh-services-process__grid">
            {process.map((step, index) => (
              <motion.article
                className="rh-services-process-card"
                key={step.number}
                {...reveal}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              >
                <div className="rh-services-process-card__top">
                  <span>{step.number}</span>
                  {index === 0 && <ShieldCheck size={23} />}
                  {index === 1 && <Target size={23} />}
                  {index === 2 && <Waves size={23} />}
                </div>

                <div className="rh-services-process-card__rule" />

                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            ))}
          </div>

          <motion.div className="rh-services-process__note" {...reveal}>
            <span className="rh-services-process__note-icon">
              <MoveUpRight size={20} />
            </span>

            <p>
              Your care should be guided by your needs, professional
              assessment and meaningful goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="rh-services-cta">
        <div className="rh-services-cta__image" />
        <div className="rh-services-cta__overlay" />

        <motion.div
          className="rh-services-container rh-services-cta__content"
          {...reveal}
        >
          <p className="rh-services-eyebrow">
            <span />
            YOUR NEXT STEP
          </p>

          <h2 className="rh-services-title">
            Start with what
            <br />
            matters to <em>you.</em>
          </h2>

          <p className="rh-services-lead">
            Tell us about your concerns and goals. Take the first step towards
            understanding what support may be suitable for you.
          </p>

          <div className="rh-services-actions">
            <Link to="/contact" className="rh-services-button">
              Get in touch <ArrowUpRight size={18} />
            </Link>

            <Link to="/about" className="rh-services-text-link">
              About Rehabics <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Services;
