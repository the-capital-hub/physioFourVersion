
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Activity,
  MoveUpRight,
  ArrowUpRight,
  ArrowRight,
  Check,
  Plus,
  Quote,
  HeartPulse,
  Dumbbell,
  Bone,
  Footprints,
  ClipboardCheck,
  Stethoscope,
} from "lucide-react";

import image1 from '../../assets/home/image1.jpeg'
import image2 from '../../assets/home/image2.jpeg'
import image3 from '../../assets/home/image3.jpeg'
import image4 from '../../assets/home/image4.jpeg'
import image5 from '../../assets/home/image5.jpeg'

import image6 from '../../assets/home/image6.jpeg'
import image7 from '../../assets/home/image7.jpeg'
import image8 from '../../assets/home/image8.jpeg'
import image9 from '../../assets/home/image9.jpeg'
import "./Home.css";
import HeroSection from "../../components/HeroSection/HeroSection";
// Add an image property to each existing condition object.
// Keep your existing number, icon, title and text values.

const conditionImages = {
  "Sports Injuries":
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=85",

  "Back & Neck Pain":
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=85",

  "Joint & Knee Pain":
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85",

  "Mobility & Recovery":
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85",
};
const trustItems = [
  {
    icon: ShieldCheck,
    title: "Personalised care",
    text: "Built around your needs",
  },
  {
    icon: Target,
    title: "Purposeful recovery",
    text: "A plan with direction",
  },
  {
    icon: Activity,
    title: "Better movement",
    text: "Focused on daily function",
  },
  {
    icon: MoveUpRight,
    title: "Steady progress",
    text: "One step at a time",
  },
];

const conditions = [
  {
    number: "01",
    icon: Activity,
    title: "Back and neck pain",
    text: "Work towards improved mobility and everyday comfort.",
  },
  {
    number: "02",
    icon: Dumbbell,
    title: "Sports injuries",
    text: "Build strength and work towards returning to activity.",
  },
  {
    number: "03",
    icon: Bone,
    title: "Joint and muscle pain",
    text: "Improve movement, control and physical confidence.",
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Post surgery recovery",
    text: "Follow a guided rehabilitation plan suited to your needs.",
  },
];

const services = [
  {
    number: "01",
    icon: Stethoscope,
    title: "Physiotherapy",
    text: "Individual assessment and care shaped around your goals.",
  },
  {
    number: "02",
    icon: HandIcon,
    title: "Manual therapy",
    text: "Hands on techniques selected for your individual needs.",
  },
  {
    number: "03",
    icon: Dumbbell,
    title: "Exercise rehabilitation",
    text: "Progressive movement to develop strength and control.",
  },
  {
    number: "04",
    icon: ClipboardCheck,
    title: "Recovery planning",
    text: "A clear approach with goals you can work towards.",
  },
];

function HandIcon(props) {
  return <Footprints {...props} />;
}

const methodSteps = [
  {
    number: "01",
    title: "Assess",
    text: "Understand your concerns, movement and personal goals.",
  },
  {
    number: "02",
    title: "Plan",
    text: "Build a practical plan around your individual needs.",
  },
  {
    number: "03",
    title: "Recover",
    text: "Work through guided movement and progressive exercises.",
  },
  {
    number: "04",
    title: "Progress",
    text: "Review your progress and build lasting confidence.",
  },
];

const carePrinciples = [
  "Care centred around your goals",
  "Clear guidance throughout recovery",
  "A focus on movement and function",
];

const faqs = [
  {
    question: "What happens during my first appointment?",
    answer:
      "Your appointment may include a discussion of your concerns and goals, a relevant movement assessment and a proposed care plan. The process depends on your individual needs.",
  },
  {
    question: "Will my rehabilitation plan be personalised?",
    answer:
      "Your plan should reflect your goals, current abilities and progress. Your physiotherapist can adjust it as your needs change.",
  },
  {
    question: "How long does recovery take?",
    answer:
      "Recovery varies depending on your condition, its severity and individual factors. Your clinician can discuss realistic milestones after assessing your needs.",
  },
  {
    question: "Can I exercise while recovering?",
    answer:
      "That depends on your condition and symptoms. Ask your treating clinician which activities are appropriate and how to modify them safely.",
  },
  {
    question: "How can I get started?",
    answer:
      "Visit our contact page to enquire about services, availability and the next steps for arranging an appointment.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();

  const revealProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.15 },
        variants: reveal,
      };

  return (
    <div className="rh-home">
      {/* 01. EXISTING HERO */}
      <HeroSection/>

      {/* 02. TRUST STRIP */}
      
<section
  className="rh-trust"
  aria-label="The Rehabics difference"
>
  <div className="rh-container">
    <div className="rh-trust__header">
      <span className="rh-trust__eyebrow">
        THE REHABICS DIFFERENCE
      </span>

      <p className="rh-trust__intro">
        Thoughtful care. Expert guidance. Progress that matters.
      </p>
    </div>

    <div className="rh-trust__grid">
      {trustItems.map(({ icon: Icon, title, text }, index) => (
        <motion.article
          key={title}
          className="rh-trust__item"
          {...revealProps}
          transition={{
            delay: index * 0.1,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="rh-trust__top">
            <span className="rh-trust__number">
              0{index + 1}
            </span>

            <span className="rh-trust__icon">
              <Icon
                size={24}
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </span>
          </div>

          <div className="rh-trust__content">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>

          <span
            className="rh-trust__accent"
            aria-hidden="true"
          />
        </motion.article>
      ))}
    </div>
  </div>
</section>


      {/* 03. OUR PHILOSOPHY */}
      
<section className="rh-philosophy rh-section">
  <div className="rh-container rh-split">
    <motion.div
      className="rh-image-frame"
      {...revealProps}
    >
      <img
        src={image2}
        alt="Athlete training to improve strength, control and movement"
        loading="lazy"
      />

      <div className="rh-image-overlay" />

      <div className="rh-image-topline">
        <span className="rh-image-dot" />
        <span>REHABICS / MOVEMENT SCIENCE</span>
      </div>

      <div className="rh-image-caption">
        <span className="rh-image-label">
          THE ART OF RECOVERY
        </span>
        <p>
          Better movement.
          <br />
          <em>Stronger living.</em>
        </p>
      </div>

      <span className="rh-image-index">
        01 <span /> 04
      </span>
    </motion.div>

    <motion.div
      className="rh-copy rh-philosophy__copy"
      {...revealProps}
      transition={{
        duration: 0.75,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <p className="rh-eyebrow">
        <span aria-hidden="true" />
        OUR PHILOSOPHY
      </p>

      <h2 className="rh-heading">
        Recovery is not just
        <br />
        getting back.
        <em> It is moving forward.</em>
      </h2>

      <div className="rh-philosophy__divider" />

      <p className="rh-body rh-philosophy__lead">
        Your body has a story. Your recovery should too.
      </p>

      <p className="rh-body">
        Every person moves differently, faces different challenges
        and works towards different goals. We believe rehabilitation
        should look beyond the problem and focus on the person.
      </p>

      <p className="rh-body">
        Through thoughtful guidance, purposeful movement and
        progressive care, we help you build confidence in your body
        and take the next step towards the life you want to live.
      </p>

      <Link className="rh-text-link rh-philosophy__link" to="/approach">
        <span>Discover our approach</span>
        <span className="rh-philosophy__link-icon">
          <ArrowUpRight size={19} strokeWidth={1.5} />
        </span>
      </Link>

      <div className="rh-philosophy__footnote">
        <span>01</span>
        <span>PERSON FIRST. PROGRESS ALWAYS.</span>
      </div>
    </motion.div>
  </div>
</section>


      {/* 04. CONDITIONS */}
      
<section className="rh-conditions rh-section">
  <div className="rh-container">
    <motion.div
      className="rh-conditions__header"
      {...revealProps}
    >
      <div className="rh-conditions__heading-group">
        <p className="rh-eyebrow">
          <span aria-hidden="true" />
          WHO WE HELP
        </p>

        <h2 className="rh-heading">
          Move beyond
          <br />
          <em>limitations.</em>
        </h2>
      </div>

      <p className="rh-conditions__intro">
        Personalised support for the challenges that affect
        how you move, work, train and live. Every recovery
        journey starts with understanding what matters to you.
      </p>
    </motion.div>

    <div className="rh-condition-grid">
      {conditions.map(({ number, title, text }, index) => {
        const image =
          conditionImages[title] ||
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=85";

        return (
          <motion.article
            key={number}
            className="rh-condition-card"
            {...revealProps}
            transition={{
              delay: index * 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              to="/conditions"
              className="rh-condition-card__image-link"
              aria-label={`Explore ${title}`}
            >
              <img
                className="rh-condition-card__image"
                src={image}
                alt={`${title} physiotherapy and rehabilitation`}
                loading="lazy"
              />

              <span className="rh-condition-card__image-shade" />

              <span className="rh-condition-card__image-label">
                REHABICS / MOVEMENT CARE
              </span>

              <span className="rh-condition-card__image-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>

            <div className="rh-condition-card__body">
              <div className="rh-condition-card__content">
                <span className="rh-condition-card__number">
                  {String(number).padStart(2, "0")}
                </span>

                <h3>{title}</h3>

                <p>{text}</p>
              </div>

              <Link
                className="rh-condition-card__link"
                to="/conditions"
                aria-label={`Explore ${title}`}
              >
                <span>Explore condition</span>

                <span className="rh-condition-card__arrow">
                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
          </motion.article>
        );
      })}
    </div>

    <div className="rh-conditions__footer">
      <span className="rh-conditions__footer-line" />

      <p>
        EVERY BODY IS DIFFERENT. EVERY RECOVERY JOURNEY IS PERSONAL.
      </p>
    </div>
  </div>
</section>


      {/* 05. SERVICES */}
      
<section className="rh-services rh-section">
  <div className="rh-container rh-services__layout">
    <motion.div
      className="rh-services__intro"
      {...revealProps}
    >
      <p className="rh-eyebrow">
        <span aria-hidden="true" />
        WHAT WE DO
      </p>

      <h2 className="rh-heading">
        Care that moves
        <br />
        <em>with you.</em>
      </h2>

      <p className="rh-body">
        Practical rehabilitation guided by your needs, your
        abilities and the activities that matter to you.
        Our approach combines expert guidance with purposeful
        movement to support your progress.
      </p>

      <Link to="/services" className="rh-button rh-button--light">
        <span>Explore services</span>
        <ArrowUpRight size={18} strokeWidth={1.6} />
      </Link>

      <div className="rh-services__note">
        <span className="rh-services__note-line" />
        <span>PERSONALISED CARE. PURPOSEFUL PROGRESS.</span>
      </div>
    </motion.div>

    <div className="rh-services__list">
      {services.map(({ number, icon: Icon, title, text }, index) => (
        <motion.article
          className="rh-service-row"
          key={number}
          {...revealProps}
          transition={{
            delay: index * 0.08,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="rh-service-row__number">
            {String(number).padStart(2, "0")}
          </span>

          <div className="rh-service-row__icon">
            <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
          </div>

          <div className="rh-service-row__copy">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>

          <Link
            to="/services"
            className="rh-service-row__link"
            aria-label={`Explore ${title}`}
          >
            <ArrowUpRight size={20} strokeWidth={1.5} />
          </Link>
        </motion.article>
      ))}
    </div>
  </div>
</section>


      {/* 06. THE REHABICS METHOD */}
      

{/* 06. THE REHABICS METHOD */}

<section className="rh-method rh-section">
  <div className="rh-container">
    <motion.div
      className="rh-method__heading"
      {...revealProps}
    >
      <p className="rh-eyebrow">
        <span aria-hidden="true" />
        THE REHABICS METHOD
      </p>

      <div className="rh-method__title-wrap">
        <h2 className="rh-heading">
          Recovery with
          <br />
          <em>a clear direction.</em>
        </h2>

        <p className="rh-body">
          Thoughtful assessment. A plan built around you.
          Progress guided by your individual needs,
          abilities and goals.
        </p>
      </div>
    </motion.div>

    <div className="rh-method__grid">
      {methodSteps.map((step, index) => (
        <motion.article
          className="rh-method-card"
          key={step.number}
          {...revealProps}
          transition={{
            delay: index * 0.09,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="rh-method-card__top">
            <span className="rh-method-card__number">
              {String(step.number).padStart(2, "0")}
            </span>

            <span
              className="rh-method-card__check"
              aria-hidden="true"
            >
              <Check size={17} strokeWidth={1.6} />
            </span>
          </div>

          <div className="rh-method-card__rule" />

          <div className="rh-method-card__content">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>

          <span
            className="rh-method-card__index"
            aria-hidden="true"
          >
            STEP {String(index + 1).padStart(2, "0")}
          </span>
        </motion.article>
      ))}
    </div>

    <div className="rh-method__foot">
      <span>ASSESSMENT</span>
      <span className="rh-method__foot-line" />
      <span>PERSONALISED PLAN</span>
      <span className="rh-method__foot-line" />
      <span>GUIDED PROGRESS</span>
    </div>
  </div>
</section>


      {/* 07. OUR APPROACH */}
      
{/* 07. PEOPLE FIRST */}
<section className="rh-team rh-section">
  <div className="rh-container rh-split">

    <motion.div
      className="rh-image-frame rh-team__image"
      {...revealProps}
    >
      <img
        src={image4}
        alt="Healthcare professionals discussing patient care"
        loading="lazy"
      />

      <div className="rh-team__image-overlay" />

      <span className="rh-image-label">
        CARE WITH PURPOSE
      </span>

      <div className="rh-team__image-note">
        <span className="rh-team__note-line" />
        <p>PERSONAL ATTENTION. THOUGHTFUL REHABILITATION.</p>
      </div>
    </motion.div>

    <motion.div
      className="rh-copy rh-team__copy"
      {...revealProps}
    >
      <p className="rh-eyebrow">
        <span aria-hidden="true" />
        PEOPLE FIRST
      </p>

      <h2 className="rh-heading">
        Expertise matters.
        <em> So does listening.</em>
      </h2>

      <p className="rh-body">
        Good rehabilitation starts with understanding the person
        behind the problem. Clear communication, individual attention
        and realistic goals should guide every step of recovery.
      </p>

      <ul className="rh-check-list rh-team__principles">
        {carePrinciples.map((point, index) => (
          <li key={point}>
            <span className="rh-team__check">
              <Check size={15} strokeWidth={1.8} />
            </span>
            <span>{point}</span>
            <span className="rh-team__principle-number">
              0{index + 1}
            </span>
          </li>
        ))}
      </ul>

      <Link to="/about" className="rh-text-link rh-team__link">
        Discover Rehabics
        <ArrowUpRight size={18} />
      </Link>
    </motion.div>

  </div>
</section>


      {/* 08. MOVEMENT AND PROGRESS */}
     
{/* 08. PROGRESS AND POSSIBILITIES */}
<section className="rh-progress rh-section" style={{color:"black"}}>
  <div className="rh-container rh-progress__layout">

    <motion.div
      className="rh-progress__copy"
      {...revealProps}
    >
      <p className="rh-eyebrow">
        <span aria-hidden="true" />
        THE BIGGER PICTURE
      </p>

      <div className="rh-progress__quote-mark" aria-hidden="true">
        <Quote size={32} strokeWidth={1.3} />
      </div>

      <h2 className="rh-heading">
        Small steps.
        <br />
        Stronger movement.
        <br />
        <em>More possibilities.</em>
      </h2>

      <p className="rh-body">
        Progress is not always a straight line. With consistency,
        thoughtful guidance and realistic goals, every step can
        become part of a stronger relationship with movement.
      </p>

      <Link to="/approach" className="rh-text-link rh-progress__link">
        Explore our approach
        <ArrowUpRight size={18} />
      </Link>

      <div className="rh-progress__principle">
        <span className="rh-progress__principle-line" />
        <span>PROGRESS AT YOUR OWN PACE</span>
      </div>
    </motion.div>

    <motion.div
      className="rh-progress__visual"
      {...revealProps}
    >
      <img
        src={image6}
        alt="Runner training outdoors"
        loading="lazy"
      />

      <div className="rh-progress__image-shade" />

      <span className="rh-progress__caption">
        <span className="rh-progress__caption-dot" />
        EVERY STEP COUNTS
      </span>

      <div className="rh-progress__side-label">
        MOVEMENT / STRENGTH / CONFIDENCE
      </div>

      <div className="rh-progress__image-index" aria-hidden="true">
        <span>08</span>
        <span className="rh-progress__index-line" />
        <span>10</span>
      </div>
    </motion.div>

  </div>
</section>


      {/* 09. FAQ */}
     <section className="rh-faq rh-section">
        <div className="rh-container rh-faq__layout">
          <motion.div className="rh-faq__intro" {...revealProps}>
            <p className="rh-eyebrow">
              <span /> QUESTIONS AND ANSWERS
            </p>

            <h2 className="rh-heading">
              Good questions.
              <em> Clear answers.</em>
            </h2>

            <p className="rh-body">
              Learn a little more about the process before taking your next
              step.
            </p>

            <Link to="/contact" className="rh-text-link">
              Ask us a question <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          <div className="rh-faq__list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <article
                  className={`rh-faq-item ${isOpen ? "is-open" : ""}`}
                  key={faq.question}
                >
                  <button
                    className="rh-faq-item__question"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="rh-faq-item__number">
                      0{index + 1}
                    </span>

                    <span className="rh-faq-item__title">
                      {faq.question}
                    </span>

                    <Plus
                      className="rh-faq-item__icon"
                      size={20}
                      strokeWidth={1.5}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="rh-faq-item__answer"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.25 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      
{/* 10. FINAL CALL TO ACTION */}
<section className="rh-final-cta">

  <div
    className="rh-final-cta__image"
    aria-hidden="true"
  />

  <div className="rh-final-cta__overlay" />

  <motion.div
    className="rh-container rh-final-cta__content"
    {...revealProps}
  >
    <p className="rh-eyebrow">
      <span aria-hidden="true" />
      YOUR NEXT CHAPTER
    </p>

    <h2 className="rh-heading">
      Your next chapter
      <br />
      starts with <em>movement.</em>
    </h2>

    <p className="rh-body">
      Every journey begins somewhere. Start with a conversation
      about your goals, your challenges and the support that may
      help you move forward with greater confidence.
    </p>

    <div className="rh-final-cta__actions">
      <Link
        to="/contact"
        className="rh-button rh-button--light rh-final-cta__primary"
      >
        Get in touch
        <ArrowUpRight size={18} />
      </Link>

      <Link
        to="/approach"
        className="rh-final-cta__secondary"
      >
        Our approach
        <ArrowRight size={18} />
      </Link>
    </div>

    <div className="rh-final-cta__bottom">
      <span className="rh-final-cta__bottom-line" />
      <span>PERSONALISED CARE. PURPOSEFUL MOVEMENT.</span>
    </div>
  </motion.div>

  <span className="rh-final-cta__index">
    REHABICS <span aria-hidden="true">/</span> MOVE FORWARD
  </span>

  <span className="rh-final-cta__corner" aria-hidden="true">
    10
  </span>
</section>

    </div>
  );
}
