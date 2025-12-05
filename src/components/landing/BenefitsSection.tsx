import { Zap, Users, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Tilt from "react-parallax-tilt";
import { useSpring, animated } from "@react-spring/web";

const benefits = [
  {
    icon: Zap,
    title: "Practical Skills, Not Just Theory",
    description: "Every lesson is project-based. You'll build real tools you can use and showcase in your portfolio.",
  },
  {
    icon: Users,
    title: "Community-Driven Learning",
    description: "Join a cohort of ambitious builders. Collaborate, get feedback, and grow together.",
  },
  {
    icon: Rocket,
    title: "From Zero to AI Engineer",
    description: "No prior AI experience needed. We take you from fundamentals to deploying production systems.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal direction="down">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Flag Skool?
            </h2>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} direction="up" delay={index * 150}>
              <Tilt
                className="h-full"
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.05}
                transitionSpeed={2500}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="#ef4444"
                glarePosition="all"
              >
                <div className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:rotate-6">
                    <benefit.icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Tilt>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
