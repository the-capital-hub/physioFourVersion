
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Activity,
  MoveUpRight,
} from "lucide-react";

import "./TrustStrip.css";

const trustItems = [
  {
    id: "01",
    icon: ShieldCheck,
    title: "Personalised Care",
    description: "Built around your needs",
  },
  {
    id: "02",
    icon: Target,
    title: "Purposeful Recovery",
    description: "A plan with direction",
  },
  {
    id: "03",
    icon: Activity,
    title: "Better Movement",
    description: "Focused on daily function",
  },
  {
    id: "04",
    icon: MoveUpRight,
    title: "Steady Progress",
    description: "One step at a time",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="rh-trust"
      aria-label="The Rehabics difference"
    >
      <div className="rh-trust__inner">
        <motion.div
          className="rh-trust__grid"
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className="rh-trust__item"
                key={item.id}
                variants={shouldReduceMotion ? {} : itemVariants}
              >
                <div className="rh-trust__number">
                  <span>{item.id}</span>

                  <span className="rh-trust__number-line" />
                </div>

                <div className="rh-trust__icon-wrap">
                  <Icon
                    className="rh-trust__icon"
                    size={23}
                    strokeWidth={1.45}
                    aria-hidden="true"
                  />
                </div>

                <div className="rh-trust__content">
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>

                <span className="rh-trust__index">
                  0{index + 1}
                </span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
