import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import { ReactNode, useEffect } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  className?: string;
}

const ScrollReveal = ({ 
  children, 
  direction = "up", 
  delay = 0,
  className = "" 
}: ScrollRevealProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 };
      case "down":
        return { y: -50, opacity: 0 };
      case "left":
        return { x: 50, opacity: 0 };
      case "right":
        return { x: -50, opacity: 0 };
      case "fade":
        return { opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      case "fade":
        return { opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  const animation = useSpring({
    from: getInitialPosition(),
    to: inView ? getFinalPosition() : getInitialPosition(),
    delay: delay,
    config: {
      tension: 100,
      friction: 50,
    },
  });

  return (
    <animated.div ref={ref} style={animation} className={className}>
      {children}
    </animated.div>
  );
};

export default ScrollReveal;

