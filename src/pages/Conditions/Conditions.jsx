
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  Accessibility,
  Dumbbell,
  PersonStanding,
  Search,
  Bone,
  Footprints,
  RotateCcw,
} from "lucide-react";
import "./Conditions.css";

const conditions = [
  {
    number: "01",
    title: "Back Pain",
    category: "Pain",
    description:
      "Explore support for back discomfort, movement limitations and everyday activities that have become difficult.",
    icon: Accessibility,
    tags: ["Lower back", "Movement", "Daily function"],
  },
  {
    number: "02",
    title: "Neck Pain",
    category: "Pain",
    description:
      "Understand possible approaches to neck discomfort, stiffness and challenges with comfortable movement.",
    icon: RotateCcw,
    tags: ["Stiffness", "Mobility", "Posture"],
  },
  {
    number: "03",
    title: "Shoulder Pain",
    category: "Pain",
    description:
      "Explore care options for shoulder discomfort that may affect reaching, lifting and everyday tasks.",
    icon: Activity,
    tags: ["Shoulder mobility", "Strength", "Function"],
  },
  {
    number: "04",
    title: "Knee Pain",
    category: "Mobility",
    description:
      "Find out how an individual assessment may help address knee related movement and functional concerns.",
    icon: PersonStanding,
    tags: ["Walking", "Stairs", "Movement"],
  },
  {
    number: "05",
    title: "Sports Injuries",
    category: "Sports",
    description:
      "Explore rehabilitation support focused on movement, physical function and a considered return to activity.",
    icon: Dumbbell,
    tags: ["Training", "Recovery", "Performance"],
  },
  {
    number: "06",
    title: "Joint Mobility",
    category: "Mobility",
    description:
      "Understand ways to work towards improved movement, flexibility and confidence with everyday activities.",
    icon: Bone,
    tags: ["Flexibility", "Joint function", "Movement"],
  },
  {
    number: "07",
    title: "Muscle Strain",
    category: "Sports",
    description:
      "Explore appropriate assessment and rehabilitation guidance for muscle related discomfort and activity limitations.",
    icon: Activity,
    tags: ["Muscle function", "Strength", "Activity"],
  },
  {
    number: "08",
    title: "Walking Difficulties",
    category: "Mobility",
    description:
      "Discuss movement and balance concerns with a qualified professional to understand suitable next steps.",
    icon: Footprints,
    tags: ["Walking", "Balance", "Confidence"],
  },
];

const filters = ["All", "Pain", "Mobility", "Sports"];

const Conditions = () => {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredConditions = useMemo(() => {
    const term = search.trim().toLowerCase();

    return conditions.filter((item) => {
      const matchesCategory =
        activeFilter === "All" || item.category === activeFilter;

      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, search]);

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduceMotion ? 0 : 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <main className="rh-conditions">
      <section className="rh-conditions-hero">
        <div className="rh-conditions-hero__image" />
        <div className="rh-conditions-hero__overlay" />

        <div className="rh-conditions-container rh-conditions-hero__content">
          <motion.div {...reveal}>
            <p className="rh-conditions-eyebrow">
              <span />
              UNDERSTAND YOUR MOVEMENT
            </p>

            <h1 className="rh-conditions-title">
              Every challenge
              <br />
              has a <em>starting point.</em>
            </h1>

            <p className="rh-conditions-lead">
              Explore common movement concerns and discover how a personalised
              physiotherapy approach may help you work towards your goals.
            </p>

            <a
              href="#explore-conditions"
              className="rh-conditions-button"
            >
              Explore conditions <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>

        <div className="rh-conditions-hero__bottom">
          <span>UNDERSTAND</span>
          <span className="rh-conditions-line" />
          <span>MOVE FORWARD</span>
        </div>
      </section>

      <section
        className="rh-conditions-explore"
        id="explore-conditions"
      >
        <div className="rh-conditions-container">
          <motion.div
            className="rh-conditions-heading"
            {...reveal}
          >
            <div>
              <p className="rh-conditions-eyebrow">
                <span />
                EXPLORE YOUR OPTIONS
              </p>
              <h2 className="rh-conditions-title">
                Find what matters
                <br />
                <em>to your movement.</em>
              </h2>
            </div>

            <p className="rh-conditions-body">
              Every person's experience is different. Start by exploring the
              area closest to your concern, then discuss your situation with
              a qualified physiotherapy professional.
            </p>
          </motion.div>

          <div className="rh-conditions-tools">
            <div className="rh-conditions-filters" aria-label="Filter conditions">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={`rh-conditions-filter ${
                    activeFilter === filter ? "is-active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>

            <label className="rh-conditions-search">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conditions"
                aria-label="Search conditions"
              />
            </label>
          </div>

          <div className="rh-conditions-results" aria-live="polite" aria-atomic="true">
            <span>{filteredConditions.length} {filteredConditions.length === 1 ? "condition" : "conditions"} found</span>
            {(search || activeFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="rh-conditions-reset"
              >
                Reset search and filters
              </button>
            )}
          </div>

          <div className="rh-conditions-grid" aria-live="polite">
            {filteredConditions.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className="rh-condition-card"
                  key={item.number}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : (index % 4) * 0.06,
                  }}
                >
                  <div className="rh-condition-card__top">
                    <span>{item.number}</span>
                    <Icon size={25} strokeWidth={1.35} />
                  </div>

                  <div className="rh-condition-card__rule" />

                  <p className="rh-condition-card__category">
                    {item.category}
                  </p>

                  <h3>{item.title}</h3>
                  <p className="rh-condition-card__description">
                    {item.description}
                  </p>

                  <div className="rh-condition-card__tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="rh-condition-card__link"
                    aria-label={`Ask about support for ${item.title}`}
                  >
                    Discuss your concern <ArrowUpRight size={17} />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          {filteredConditions.length === 0 && (
            <div className="rh-conditions-empty">
              <Search size={25} />
              <h3>No matching conditions found</h3>
              <p>Try another search term or choose a different category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          <p className="rh-conditions-disclaimer">
            This information is for general guidance only and is not a
            diagnosis. A qualified professional can assess your individual
            needs and recommend appropriate care.
          </p>
        </div>
      </section>

      <section className="rh-conditions-process">
        <div className="rh-conditions-container rh-conditions-process__grid">
          <motion.div {...reveal}>
            <p className="rh-conditions-eyebrow">
              <span />
              A THOUGHTFUL START
            </p>
            <h2 className="rh-conditions-title">
              Understand the concern.
              <br />
              <em>Plan the next step.</em>
            </h2>
            <p className="rh-conditions-body">
              The right next step starts with understanding your experience,
              movement goals and individual circumstances.
            </p>
            <Link to="/approach" className="rh-conditions-inline-link">
              Discover our approach <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            className="rh-conditions-process__steps"
            {...reveal}
          >
            {[
              {
                number: "01",
                title: "Share your experience",
                text: "Discuss your concerns, daily activities and personal goals.",
              },
              {
                number: "02",
                title: "Understand your needs",
                text: "A qualified professional can assess your situation and movement.",
              },
              {
                number: "03",
                title: "Explore suitable care",
                text: "Discuss an individual plan and how progress can be reviewed.",
              },
            ].map((step) => (
              <article
                className="rh-conditions-step"
                key={step.number}
              >
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="rh-conditions-cta">
        <div className="rh-conditions-cta__image" />
        <div className="rh-conditions-cta__overlay" />

        <motion.div
          className="rh-conditions-container rh-conditions-cta__content"
          {...reveal}
        >
          <p className="rh-conditions-eyebrow">
            <span />
            YOUR NEXT STEP
          </p>
          <h2 className="rh-conditions-title">
            Start with a conversation.
            <br />
            <em>Move forward with clarity.</em>
          </h2>
          <p className="rh-conditions-lead">
            Tell us what you are experiencing and explore the support that
            may be suitable for your needs.
          </p>
          <div className="rh-conditions-cta__actions">
            <Link to="/contact" className="rh-conditions-button">
              Get in touch <ArrowUpRight size={18} />
            </Link>
            <Link to="/services" className="rh-conditions-text-link">
              Explore services <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Conditions;
