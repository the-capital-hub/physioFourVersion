
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  HeartPulse,
  ShieldCheck,
  Target,
  Eye,
  Activity,
  HandHeart,
  Stethoscope,
  ClipboardCheck,
  Sparkles,
  MoveUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import HeroSection from "../../components/HeroSection/HeroSection";
import CTASection from "../../components/CTASection/CTASection";
import "./About.css";

const careValues = [
  {
    icon: HeartPulse,
    number: "01",
    title: "Patient First",
    description:
      "Every person is different. We believe care should reflect your needs, goals and everyday life.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Personalised Care",
    description:
      "Your recovery journey starts with understanding your movement, concerns and personal goals.",
  },
  {
    icon: Activity,
    number: "03",
    title: "Movement Matters",
    description:
      "We focus on helping you build confidence, improve mobility and return to the activities you enjoy.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Care You Can Trust",
    description:
      "We value clear communication, informed decisions and supportive guidance throughout your care.",
  },
];

const teamMembers = [
  {
    name: "Meet Our Physiotherapists",
    role: "Clinical Care Team",
    description:
      "Dedicated professionals focused on understanding your concerns and guiding your recovery.",
    icon: Stethoscope,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Your Recovery Partners",
    role: "Personalised Guidance",
    description:
      "A supportive approach that keeps your needs, comfort and progress at the centre of care.",
    icon: HandHeart,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Your Wellness Journey",
    role: "Movement and Wellbeing",
    description:
      "Practical guidance to help you understand movement and work towards your personal goals.",
    icon: Activity,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=85",
  },
];

function About() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.55,
        ease: "easeOut",
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  return (
    <main className="rv3About">
      {/* Existing website hero */}
      <HeroSection />

      {/* About introduction */}
      <section className="rv3AboutIntro">
        <div className="rv3AboutContainer rv3AboutIntroGrid">
          <motion.div
            className="rv3AboutIntroVisual"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="rv3AboutImageFrame">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=85"
                alt="Physiotherapy professional supporting patient care"
                loading="lazy"
              />

              <div className="rv3AboutImageLabel">
                <span className="rv3AboutLabelIcon">
                  <HeartPulse size={20} />
                </span>

                <span>
                  <strong>Care with purpose</strong>
                  <small>Movement for everyday life</small>
                </span>
              </div>
            </div>

            <div className="rv3AboutImageAccent" />
            <span className="rv3AboutImageOrb" />
          </motion.div>

          <motion.div
            className="rv3AboutIntroContent"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              className="rv3AboutEyebrow"
              variants={reveal}
            >
              <span />
              GET TO KNOW REHABICS
            </motion.span>

            <motion.h2 variants={reveal}>
              Helping you move better, one step at a time.
            </motion.h2>

            <motion.p
              className="rv3AboutLead"
              variants={reveal}
            >
              We believe better movement can make a meaningful
              difference in everyday life.
            </motion.p>

            <motion.p
              className="rv3AboutBody"
              variants={reveal}
            >
              Rehabics is built around a simple idea. Every person
              deserves to feel heard, understood and supported
              throughout their physiotherapy journey. Our approach
              puts your needs, comfort and individual goals first.
            </motion.p>

            <motion.p
              className="rv3AboutBody"
              variants={reveal}
            >
              From understanding movement concerns to working
              towards greater confidence, we aim to make your
              experience clear, encouraging and centred on you.
            </motion.p>

            <motion.div
              className="rv3AboutIntroPoints"
              variants={reveal}
            >
              <span>
                <ShieldCheck size={17} />
                Individual attention
              </span>

              <span>
                <HeartPulse size={17} />
                Supportive care
              </span>
            </motion.div>

            <motion.div variants={reveal}>
              <Link
                to="/services"
                className="rv3AboutPrimaryLink"
              >
                Explore our services
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="rv3AboutPurpose">
        <div className="rv3AboutContainer">
          <motion.div
            className="rv3AboutSectionHeading rv3AboutPurposeHeading"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              className="rv3AboutEyebrow"
              variants={reveal}
            >
              OUR PURPOSE
            </motion.span>

            <motion.h2 variants={reveal}>
              Care that looks beyond the condition.
            </motion.h2>

            <motion.p variants={reveal}>
              We focus on the person behind every recovery journey
              and the everyday moments that matter to them.
            </motion.p>
          </motion.div>

          <div className="rv3AboutPurposeGrid">
            <motion.article
              className="rv3AboutPurposeCard rv3AboutMission"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={reduceMotion ? {} : { y: -5 }}
            >
              <div className="rv3AboutPurposeIcon">
                <Target size={25} />
              </div>

              <span className="rv3AboutCardLabel">
                WHAT DRIVES US
              </span>

              <h3>Our Mission</h3>

              <p>
                To make physiotherapy care more personal,
                approachable and focused on helping people move
                with greater comfort and confidence.
              </p>

              <div className="rv3AboutCardBottom">
                <span>01</span>
                <span />
                <HeartPulse size={20} />
              </div>
            </motion.article>

            <motion.article
              className="rv3AboutPurposeCard rv3AboutVision"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={reduceMotion ? {} : { y: -5 }}
            >
              <div className="rv3AboutPurposeIcon">
                <Eye size={25} />
              </div>

              <span className="rv3AboutCardLabel">
                WHERE WE ASPIRE
              </span>

              <h3>Our Vision</h3>

              <p>
                To encourage a future where people understand
                their movement, take an active role in their
                wellbeing and feel supported along the way.
              </p>

              <div className="rv3AboutCardBottom">
                <span>02</span>
                <span />
                <Sparkles size={20} />
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="rv3AboutValues">
        <div className="rv3AboutContainer">
          <motion.div
            className="rv3AboutSectionHeading"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              className="rv3AboutEyebrow"
              variants={reveal}
            >
              THE REHABICS APPROACH
            </motion.span>

            <motion.h2 variants={reveal}>
              The values behind your care.
            </motion.h2>

            <motion.p variants={reveal}>
              Thoughtful care starts with listening, understanding
              and working together towards meaningful goals.
            </motion.p>
          </motion.div>

          <motion.div
            className="rv3AboutValuesGrid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
          >
            {careValues.map((value) => {
              const ValueIcon = value.icon;

              return (
                <motion.article
                  className="rv3AboutValueCard"
                  key={value.number}
                  variants={reveal}
                  whileHover={reduceMotion ? {} : { y: -5 }}
                >
                  <div className="rv3AboutValueTop">
                    <span className="rv3AboutValueIcon">
                      <ValueIcon size={23} />
                    </span>

                    <span className="rv3AboutValueNumber">
                      {value.number}
                    </span>
                  </div>

                  <h3>{value.title}</h3>

                  <p>{value.description}</p>

                  <div className="rv3AboutValueLine" />
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="rv3AboutTeam">
        <div className="rv3AboutContainer">
          <motion.div
            className="rv3AboutTeamHeader"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <motion.span
                className="rv3AboutEyebrow"
                variants={reveal}
              >
                PEOPLE BEHIND THE CARE
              </motion.span>

              <motion.h2 variants={reveal}>
                Your journey deserves a caring team.
              </motion.h2>
            </div>

            <motion.p variants={reveal}>
              A supportive experience starts with people who
              listen, communicate and help you understand your
              next steps.
            </motion.p>
          </motion.div>

          <motion.div
            className="rv3AboutTeamGrid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
          >
            {teamMembers.map((member) => {
              const MemberIcon = member.icon;

              return (
                <motion.article
                  className="rv3AboutTeamCard"
                  key={member.name}
                  variants={reveal}
                  whileHover={reduceMotion ? {} : { y: -5 }}
                >
                  <div className="rv3AboutTeamImage">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                    />

                    <span className="rv3AboutTeamIcon">
                      <MemberIcon size={21} />
                    </span>
                  </div>

                  <div className="rv3AboutTeamContent">
                    <span className="rv3AboutTeamRole">
                      {member.role}
                    </span>

                    <h3>{member.name}</h3>

                    <p>{member.description}</p>

                    <Link
                      to="/team"
                      className="rv3AboutTeamLink"
                    >
                      Meet our team
                      <MoveUpRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div
            className="rv3AboutTeamNote"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="rv3AboutTeamNoteIcon">
              <HandHeart size={23} />
            </span>

            <p>
              Your goals matter. We believe the best care begins
              with a conversation and grows through collaboration.
            </p>

            <Link to="/contact" aria-label="Contact Rehabics">
              <ArrowUpRight size={21} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Existing website CTA */}
      <CTASection />
    </main>
  );
}

export default About;
