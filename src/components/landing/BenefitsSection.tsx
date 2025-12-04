import { Zap, Users, Rocket } from "lucide-react";

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
    <section className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Flag Skool?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
