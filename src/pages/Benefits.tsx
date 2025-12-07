import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Zap, Users, Rocket, Award, Briefcase, HeartHandshake, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Tilt from "react-parallax-tilt";
import WaitlistForm from "@/components/landing/WaitlistForm";

const benefits = [
  {
    icon: Zap,
    title: "Practical Skills, Not Just Theory",
    description: "Every lesson is project-based. You'll build real tools you can use and showcase in your portfolio. No fluff, just hands-on learning that translates directly to job skills.",
    highlights: ["Real-world projects", "Portfolio-ready work", "Industry-standard tools"],
  },
  {
    icon: Users,
    title: "Community-Driven Learning",
    description: "Join a cohort of ambitious builders. Collaborate, get feedback, and grow together. Our community Telegram is active 24/7 with mentors and peers ready to help.",
    highlights: ["Active Telegram community", "Peer collaboration", "Mentor support"],
  },
  {
    icon: Rocket,
    title: "From Zero to AI Engineer",
    description: "No prior AI experience needed. We take you from fundamentals to deploying production systems. Our structured path ensures no one gets left behind.",
    highlights: ["Beginner-friendly", "Structured learning path", "Production-ready skills"],
  },
  {
    icon: Award,
    title: "Industry-Recognized Certificate",
    description: "Earn a certificate upon completion that demonstrates your AI engineering capabilities to potential employers and clients.",
    highlights: ["Completion certificate", "Skill verification", "LinkedIn badge"],
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description: "Get access to job opportunities, resume reviews, and interview prep specifically for AI engineering roles. Our alumni network spans top tech companies.",
    highlights: ["Job board access", "Resume reviews", "Interview prep"],
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Access",
    description: "Once you're in, you're in for life. Access all current and future course materials, updates, and community events indefinitely.",
    highlights: ["Forever access", "Free updates", "Alumni events"],
  },
];

const testimonials = [
  {
    quote: "Flag Skool transformed my career. I went from knowing nothing about AI to building voice agents for clients within 3 months.",
    author: "Sarah K.",
    role: "Freelance AI Developer",
  },
  {
    quote: "The community alone is worth it. Having access to mentors and peers who are on the same journey made all the difference.",
    author: "Marcus T.",
    role: "Startup Founder",
  },
  {
    quote: "Finally, a course that focuses on practical skills. I was deploying my first automation within the first week.",
    author: "Jennifer L.",
    role: "Product Manager",
  },
];

const Benefits = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <ScrollReveal direction="down">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Why Choose Flag Skool?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just another online course. We're a community of builders, 
              a launchpad for careers, and your fastest path to AI mastery.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} direction="up" delay={index * 100}>
                <Tilt
                  className="h-full"
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1.02}
                  transitionSpeed={2500}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="#ef4444"
                  glarePosition="all"
                >
                  <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {benefit.description}
                    </p>
                    <div className="space-y-2">
                      {benefit.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal direction="down">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              What Our Students Say
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.author} direction="up" delay={index * 100}>
                <div className="p-6 rounded-2xl bg-card border border-border h-full">
                  <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-xl text-center">
          <ScrollReveal direction="up">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join the waitlist and be the first to know when enrollment opens.
            </p>
            <WaitlistForm />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Benefits;
