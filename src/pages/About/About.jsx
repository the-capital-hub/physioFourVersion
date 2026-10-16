
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
  Target,
  Eye,
  Users,
  ClipboardCheck,
  MoveUpRight,
  MessageCircle,
} from "lucide-react";
import "./About.css";

const values = [
  {
    number: "01",
    icon: HeartPulse,
    title: "People first",
    description:
      "Every journey begins with listening to your concerns, understanding your goals and respecting your individual needs.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Evidence informed",
    description:
      "We value thoughtful assessment, clinical reasoning and guidance shaped around your situation.",
  },
  {
    number: "03",
    icon: Users,
    title: "Care together",
    description:
      "Clear communication and consistent support help you stay involved throughout your recovery journey.",
  },
  {
    number: "04",
    icon: Activity,
    title: "Meaningful progress",
    description:
      "We focus on practical improvements that support movement, confidence and everyday activities.",
  },
];

const benefits = [
  "Personalised recovery guidance",
  "Clear exercise instructions",
  "Goals shaped around your routine",
  "A progress focused approach",
];

const journeySteps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We start by learning about your concerns, daily activities and personal goals.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Assess",
    description:
      "We work to understand your movement needs and the challenges you experience.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Plan",
    description:
      "We explore suitable next steps and build a plan around your individual needs.",
    icon: Target,
  },
  {
    number: "04",
    title: "Progress",
    description:
      "We review your experience and adapt your approach as your needs evolve.",
    icon: Activity,
  },
];

const reveal = (reduceMotion, distance = 22) => ({
  initial: reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: {
    duration: reduceMotion ? 0 : 0.55,
    ease: "easeOut",
  },
});

function Eyebrow({ children, light = false }) {
  return (
    <span className={`rh-about-eyebrow${light ? " is-light" : ""}`}>
      <span className="rh-about-eyebrow-line" />
      {children}
    </span>
  );
}

function About() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="rh-about">
      {/* HERO */}
      <section className="rh-about-hero">
        <div className="rh-about-hero-grid">
          <motion.div
            className="rh-about-hero-copy"
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.65 }}
          >
            <Eyebrow>GET TO KNOW US</Eyebrow>

            <h1>
              Better
              <br />
              movement.
              <br />
              <span>Better living.</span>
            </h1>

            <p className="rh-about-hero-description">
              Recovery is about more than getting back on your feet. It is
              about rebuilding confidence, understanding your body and
              returning to the moments that make life meaningful.
            </p>

            <div className="rh-about-hero-actions">
              <Link to="/contact" className="rh-about-button">
                <span>Start your journey</span>
                <ArrowUpRight size={18} />
              </Link>

              <Link to="/services" className="rh-about-text-link">
                Explore our services
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="rh-about-hero-footnote">
              <span className="rh-about-status-dot" />
              <span>INDIVIDUAL CARE. PURPOSEFUL MOVEMENT.</span>
            </div>
          </motion.div>

          <motion.div
            className="rh-about-hero-visual"
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.1,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85"
              alt="Guided exercise and physical movement training"
              fetchPriority="high"
            />

            <div className="rh-about-image-shade" />

            <div className="rh-about-image-topline">
              <span>REHABICS / ABOUT</span>
              <span>01 — 04</span>
            </div>

            <div className="rh-about-image-caption">
              <span className="rh-about-caption-icon">
                <Activity size={20} />
              </span>
              <div>
                <strong>Recovery with purpose</strong>
                <span>Small steps. Meaningful progress.</span>
              </div>
            </div>

            <div className="rh-about-image-side-label">
              PEOPLE
              <br />
              PROCESS
              <br />
              PROGRESS
            </div>
          </motion.div>
        </div>

        <div className="rh-about-hero-bottom">
          <span>BUILT AROUND YOU</span>
          <a href="#our-story" aria-label="Scroll to our story">
            <ArrowDown size={18} />
          </a>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* STORY */}
      <section
        id="our-story"
        className="rh-about-section rh-about-story"
      >
        <div className="rh-about-container rh-about-story-grid">
          <motion.div
            className="rh-about-story-visual"
            {...reveal(reduceMotion)}
          >
            <img
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=85"
              alt="A guided physiotherapy and recovery session"
              loading="lazy"
            />

            <div className="rh-about-story-index">
              <span>OUR BELIEF</span>
              <strong>Every person has a different starting point.</strong>
            </div>
          </motion.div>

          <motion.div
            className="rh-about-story-content"
            {...reveal(reduceMotion, 16)}
          >
            <Eyebrow>OUR STORY</Eyebrow>

            <h2>
              More than treatment.
              <span>A broader perspective.</span>
            </h2>

            <p>
              Movement challenges can affect how we work, rest, exercise
              and enjoy everyday life. We believe physiotherapy should
              feel understandable, supportive and connected to the things
              that matter to you.
            </p>

            <p>
              Rehabics is built around a thoughtful approach to movement
              and recovery. We bring together practical education,
              individual goals and structured guidance to help people
              take a more active role in their wellbeing.
            </p>

            <Link to="/approach" className="rh-about-inline-link">
              Discover our approach
              <ArrowUpRight size={18} />
            </Link>

            <div className="rh-about-story-signature">
              <span className="rh-about-signature-line" />
              <span>CARE THAT STARTS WITH UNDERSTANDING</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="rh-about-purpose">
        <div className="rh-about-container">
          <motion.div
            className="rh-about-section-heading"
            {...reveal(reduceMotion)}
          >
            <Eyebrow>OUR PURPOSE</Eyebrow>
            <h2>
              A clearer path
              <span> towards better movement.</span>
            </h2>
            <p>
              Our purpose shapes how we listen, educate and support
              people through their individual recovery journeys.
            </p>
          </motion.div>

          <div className="rh-about-purpose-grid">
            <motion.article
              className="rh-about-purpose-card"
              {...reveal(reduceMotion)}
            >
              <div className="rh-about-purpose-card-top">
                <span className="rh-about-card-index">01 / MISSION</span>
                <Target size={23} strokeWidth={1.7} />
              </div>

              <h3>Make recovery more accessible.</h3>

              <p>
                Make physiotherapy guidance more approachable through
                useful education, individual plans and support that can
                fit into everyday routines.
              </p>

              <span className="rh-about-card-bottom">
                GUIDANCE WITH PURPOSE
              </span>
            </motion.article>

            <motion.article
              className="rh-about-purpose-card rh-about-purpose-card-featured"
              {...reveal(reduceMotion)}
            >
              <div className="rh-about-purpose-card-top">
                <span className="rh-about-card-index">02 / VISION</span>
                <Eye size={23} strokeWidth={1.7} />
              </div>

              <h3>A future with better movement.</h3>

              <p>
                Help more people understand their bodies, develop
                healthier movement habits and feel more confident in
                their everyday lives.
              </p>

              <span className="rh-about-card-bottom">
                PROGRESS THAT MATTERS
              </span>
            </motion.article>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="rh-about-section rh-about-values">
        <div className="rh-about-container">
          <div className="rh-about-values-heading">
            <motion.div {...reveal(reduceMotion)}>
              <Eyebrow>WHAT GUIDES US</Eyebrow>
              <h2>
                Principles
                <span> that matter.</span>
              </h2>
            </motion.div>

            <motion.p {...reveal(reduceMotion, 12)}>
              Good care begins with listening, honest communication and
              a shared understanding of what progress means to you.
            </motion.p>
          </div>

          <div className="rh-about-values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  className="rh-about-value-card"
                  key={value.number}
                  {...reveal(reduceMotion, 18)}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : index * 0.07,
                  }}
                >
                  <div className="rh-about-value-top">
                    <span>{value.number}</span>
                    <Icon size={23} strokeWidth={1.6} />
                  </div>

                  <h3>{value.title}</h3>
                  <p>{value.description}</p>

                  <div className="rh-about-value-rule" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="rh-about-journey">
        <div className="rh-about-container">
          <div className="rh-about-journey-heading">
            <motion.div {...reveal(reduceMotion)}>
              <Eyebrow light>YOUR JOURNEY</Eyebrow>
              <h2>
                A clear process.
                <span>An individual journey.</span>
              </h2>
            </motion.div>

            <motion.p {...reveal(reduceMotion, 12)}>
              Everyone has a different starting point. Our approach
              creates space for understanding, practical planning and
              ongoing progress.
            </motion.p>
          </div>

          <div className="rh-about-journey-grid">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  className="rh-about-journey-card"
                  key={step.number}
                  {...reveal(reduceMotion, 16)}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : index * 0.07,
                  }}
                >
                  <div className="rh-about-journey-top">
                    <span>{step.number}</span>
                    <Icon size={23} strokeWidth={1.6} />
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  <div className="rh-about-journey-bottom">
                    <span>STEP {step.number}</span>
                    <ArrowUpRight size={17} />
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="rh-about-journey-footer">
            <span className="rh-about-status-dot" />
            <span>INDIVIDUAL NEEDS. THOUGHTFUL GUIDANCE. MEANINGFUL GOALS.</span>
          </div>
        </div>
      </section>

      {/* PRACTICAL APPROACH */}
      <section className="rh-about-section rh-about-approach">
        <div className="rh-about-container rh-about-approach-grid">
          <motion.div
            className="rh-about-approach-content"
            {...reveal(reduceMotion)}
          >
            <Eyebrow>YOUR GOALS COME FIRST</Eyebrow>

            <h2>
              Recovery that
              <span> considers the whole picture.</span>
            </h2>

            <p>
              Your routine, your movement needs and your goals all matter.
              We believe guidance should be clear, practical and shaped
              around the individual rather than a one size fits all plan.
            </p>

            <div className="rh-about-benefits">
              {benefits.map((benefit) => (
                <div className="rh-about-benefit" key={benefit}>
                  <span className="rh-about-benefit-check">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Link to="/services" className="rh-about-button">
              <span>Explore our services</span>
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            className="rh-about-approach-visual"
            {...reveal(reduceMotion, 18)}
          >
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1100&q=85"
              alt="Stretching and mindful movement practice"
              loading="lazy"
            />

            <div className="rh-about-approach-note">
              <div className="rh-about-approach-note-icon">
                <ClipboardCheck size={22} />
              </div>
              <div>
                <strong>Built around your goals</strong>
                <span>Thoughtful guidance, one step at a time.</span>
              </div>
            </div>

            <span className="rh-about-approach-image-label">
              MOVEMENT / CONFIDENCE / PROGRESS
            </span>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="rh-about-cta">
        <div className="rh-about-cta-image" />

        <div className="rh-about-container rh-about-cta-inner">
          <motion.div {...reveal(reduceMotion)}>
            <Eyebrow light>YOUR NEXT STEP</Eyebrow>

            <h2>
              Start with a conversation.
              <span>Move forward with purpose.</span>
            </h2>

            <p>
              Have questions about physiotherapy or the next step in
              your journey? Get in touch with our team.
            </p>

            <div className="rh-about-cta-actions">
              <Link to="/contact" className="rh-about-button">
                <span>Talk to our team</span>
                <ArrowUpRight size={18} />
              </Link>

              <Link to="/appointment" className="rh-about-cta-secondary">
                Book an appointment
                <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>

          <div className="rh-about-cta-mark">
            <Activity size={39} strokeWidth={1.25} />
            <span>REHABICS</span>
            <small>MOVEMENT. RECOVERY. PERFORMANCE.</small>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
