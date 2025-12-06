import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Check, Star, Zap, Crown } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Tilt from "react-parallax-tilt";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$497",
    originalPrice: "$997",
    description: "Perfect for individuals getting started with AI",
    icon: Zap,
    features: [
      "Full 8-week curriculum access",
      "20+ live sessions",
      "Community Discord access",
      "12 hands-on projects",
      "Completion certificate",
      "3 months of updates",
    ],
    notIncluded: [
      "1-on-1 mentorship",
      "Career support",
      "Lifetime access",
    ],
    highlighted: false,
    cta: "Join Waitlist",
  },
  {
    name: "Professional",
    price: "$997",
    originalPrice: "$1,997",
    description: "Best value for serious learners",
    icon: Star,
    features: [
      "Everything in Starter",
      "4x 1-on-1 mentorship calls",
      "Priority Discord support",
      "Resume & portfolio review",
      "Job board access",
      "Interview preparation",
      "Lifetime access to materials",
      "Free future course updates",
    ],
    notIncluded: [],
    highlighted: true,
    cta: "Join Waitlist",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    originalPrice: "",
    description: "For teams and organizations",
    icon: Crown,
    features: [
      "Everything in Professional",
      "Custom team training",
      "Dedicated account manager",
      "Custom project development",
      "Priority feature requests",
      "Bulk licensing options",
      "Invoice billing",
      "SLA support",
    ],
    notIncluded: [],
    highlighted: false,
    cta: "Contact Us",
  },
];

const faqs = [
  {
    question: "When does the cohort start?",
    answer: "The January 2025 cohort begins on January 15th. Early bird pricing is available until January 1st.",
  },
  {
    question: "Do I need prior coding experience?",
    answer: "No prior coding experience is required. We start from the fundamentals and build up your skills progressively.",
  },
  {
    question: "What if I fall behind?",
    answer: "All live sessions are recorded. You can catch up at your own pace, and our community is always available to help.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes, we offer a 14-day money-back guarantee. If the course isn't right for you, we'll refund your full payment.",
  },
  {
    question: "Can I pay in installments?",
    answer: "Yes, we offer 3-month payment plans for all tiers. Contact us for details.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Early Bird Pricing - Save up to 50%
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Invest in Your AI Future
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your goals. All plans include our core curriculum 
              and access to our thriving community.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.name} direction="up" delay={index * 100}>
                <Tilt
                  className="h-full"
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  scale={1.02}
                  transitionSpeed={2500}
                >
                  <div className={`h-full p-6 rounded-2xl border transition-all duration-300 relative ${
                    plan.highlighted 
                      ? "bg-card border-primary shadow-xl shadow-primary/10" 
                      : "bg-card border-border hover:border-primary/20"
                  }`}>
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {plan.badge}
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                        plan.highlighted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                      }`}>
                        <plan.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        {plan.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through ml-2">{plan.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm opacity-50">
                          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link to="/waitlist" className="block">
                      <Button 
                        className="w-full" 
                        variant={plan.highlighted ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </Tilt>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="down">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.question} direction="up" delay={index * 50}>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <ScrollReveal direction="up">
            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                14-Day Money-Back Guarantee
              </h3>
              <p className="text-muted-foreground">
                Try Flag Skool risk-free. If you're not completely satisfied within 14 days, 
                we'll refund your entire payment. No questions asked.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
