
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  HeartPulse,
  PersonStanding,
  Bone,
  Accessibility,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  Sparkles,
} from "lucide-react";

import HeroSection from "../../components/HeroSection/HeroSection";
import CTASection from "../../components/CTASection/CTASection";
import "./Services.css";

const services = [
  {
    number: "01",
    title: "Musculoskeletal Physiotherapy",
    category: "MOVEMENT AND COMFORT",
    description:
      "Personalised support for muscle discomfort, joint problems and movement challenges that affect everyday activities.",
    icon: Activity,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "02",
    title: "Sports Rehabilitation",
    category: "ACTIVE RECOVERY",
    description:
      "A progressive rehabilitation approach to support recovery and help you return to the physical activities you enjoy.",
    icon: HeartPulse,
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "03",
    title: "Posture and Mobility",
    category: "MOVE WITH CONFIDENCE",
    description:
      "Movement guidance and tailored exercises to support flexibility, balance, posture and everyday mobility.",
    icon: PersonStanding,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "04",
    title: "Orthopaedic Rehabilitation",
    category: "SUPPORTED RECOVERY",
    description:
      "Individualised rehabilitation following orthopaedic conditions, injuries or surgery, based on your needs.",
    icon: Bone,
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "05",
    title: "Neurological Rehabilitation",
    category: "FUNCTIONAL MOVEMENT",
    description:
      "Guided rehabilitation focused on functional movement, balance and practical goals suited to each individual.",
    icon: Accessibility,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "06",
    title: "Preventive Physiotherapy",
    category: "LONG TERM WELLNESS",
    description:
      "Build movement awareness and explore practical ways to support physical wellbeing and an active lifestyle.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85",
  },
];

const carePoints = [
  {
    number: "01",
    title: "Understand your needs",
    description:
      "Begin with a conversation about your concerns, daily routine and movement goals.",
    icon: HeartPulse,
  },
  {
    number: "02",
    title: "Plan your care",
    description:
      "Explore suitable care options and agree on practical goals for your rehabilitation.",
    icon: CircleCheck,
  },
  {
    number: "03",
    title: "Build your progress",
    description:
      "Review your progress and adapt your plan as your needs and abilities change.",
    icon: Activity,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function SectionHeading({ eyebrow, title, highlight, description }) {
  return (
    <motion.div
      className="rv3ServicesHeading"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="rv3ServicesHeadingTitle">
        <span className="rv3ServicesEyebrow">
          <span className="rv3ServicesEyebrowDot" />
          {eyebrow}
        </span>

        <h2>
          {title}
          <br />
          <span>{highlight}</span>
        </h2>
      </div>

      <p>{description}</p>
    </motion.div>
  );
}

function ServiceCard({ service, index, reduceMotion }) {
  const Icon = service.icon;

  return (
    <motion.article
      className="rv3ServiceCard"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: index * 0.07 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      <div className="rv3ServiceCardImage">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
        />

        <span className="rv3ServiceCardNumber">
          {service.number}
        </span>

        <span className="rv3ServiceCardIcon">
          <Icon size={22} strokeWidth={1.7} />
        </span>
      </div>

      <div className="rv3ServiceCardContent">
        <span className="rv3ServiceCardCategory">
          {service.category}
        </span>

        <h3>{service.title}</h3>

        <p>{service.description}</p>

        <Link
          to="/appointment"
          className="rv3ServiceCardLink"
          aria-label={`Enquire about ${service.title}`}
        >
          <span>Enquire about this service</span>
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="rv3ServicesPage">
      <HeroSection
        eyebrow="PERSONALISED PHYSIOTHERAPY CARE"
        title="Discover"
        highlight="Your Care."
        secondLine="Move"
        secondHighlight="Forward."
        description="Explore personalised physiotherapy services designed around your movement, your needs and the activities that matter to you."
        primaryText="Book Appointment"
        primaryLink="/appointment"
        secondaryText="Explore Services"
        secondaryLink="/services#our-services"
        showSecondary={true}
        showStats={false}
        showFloatingCards={false}
        showBenefits={false}
        imageSide="right"
        imageAlt="Physiotherapy and rehabilitation care"
      />

      <section
        className="rv3ServicesCatalog rv3Section"
        id="our-services"
      >
        <div className="rv3Container">
          <SectionHeading
            eyebrow="OUR SERVICES"
            title="Care for the way"
            highlight="you move."
            description="Explore our physiotherapy service areas and discover the type of support that may suit your individual needs."
          />

          <div className="rv3ServicesGrid">
            {services.map((service, index) => (
              <ServiceCard
                key={service.number}
                service={service}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          <motion.div
            className="rv3ServicesHelp"
            initial="hidden"
            whileInView="visible"
            variants={reveal}
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="rv3ServicesHelpIcon">
              <Sparkles size={21} />
            </span>

            <div className="rv3ServicesHelpText">
              <h3>Not sure where to start?</h3>
              <p>
                Our team can help you understand the available
                services and choose an appropriate next step.
              </p>
            </div>

            <Link to="/appointment" className="rv3ServicesHelpLink">
              Talk to our team
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="rv3ServicesApproach rv3Section">
        <div className="rv3Container rv3ServicesApproachGrid">
          <motion.div
            className="rv3ServicesApproachVisual"
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1100&q=85"
              alt="Gentle movement practice in a calm environment"
              loading="lazy"
            />

            <div className="rv3ServicesApproachLabel">
              <span>
                <HeartPulse size={20} />
              </span>
              <div>
                <strong>Your journey matters</strong>
                <small>Care shaped around your goals</small>
              </div>
            </div>

            <div className="rv3ServicesApproachAccent" />
          </motion.div>

          <div className="rv3ServicesApproachContent">
            <SectionHeading
              eyebrow="THE REHABICS APPROACH"
              title="Your needs first."
              highlight="Your progress matters."
              description="Good physiotherapy begins with understanding you. Your concerns, personal goals and everyday routine help shape your care journey."
            />

            <div className="rv3ServicesCarePoints">
              {carePoints.map((point, index) => {
                const Icon = point.icon;

                return (
                  <motion.div
                    className="rv3ServicesCarePoint"
                    key={point.number}
                    initial="hidden"
                    whileInView="visible"
                    variants={reveal}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <span className="rv3ServicesCarePointIcon">
                      <Icon size={21} />
                    </span>

                    <div className="rv3ServicesCarePointText">
                      <h3>{point.title}</h3>
                      <p>{point.description}</p>
                    </div>

                    <span className="rv3ServicesCarePointNumber">
                      {point.number}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="YOUR NEXT STEP"
        title="Find the right care"
        highlight="for your journey."
        description="Talk to our team about your movement goals and discover the physiotherapy support that may suit your needs."
        primaryText="Book an Appointment"
        primaryLink="/appointment"
        secondaryText="Explore Our Services"
        secondaryLink="/services#our-services"
        showSecondary={true}
        note="Personalised care. A stronger you."
        showNote={true}
        showVisual={true}
        showFloatingCards={true}
        visualIcon={HeartPulse}
        floatingTop={{
          title: "Move with ease",
          subtitle: "One step at a time",
        }}
        floatingBottom={{
          title: "Your recovery",
          subtitle: "Built around you",
        }}
      />
    </main>
  );
}
