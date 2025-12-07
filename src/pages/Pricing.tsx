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
    price: "₦50,000",
    originalPrice: "₦70,000",
    description: "Perfect for individuals getting started with AI",
    icon: Zap,
    features: [
      "Full 8-week curriculum access",
      "20+ live sessions",
      "Community Telegram access",
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
    price: "₦100,000",
    originalPrice: "₦135,000",
    description: "Best value for serious learners",
    icon: Star,
    features: [
      "Everything in Starter",
      "4x 1-on-1 mentorship calls",
      "Priority Telegram support",
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
    question: "Can I pay in installments?",
    answer: "Yes, we offer a two-time payment system for Professional and Enterprise plans. Contact us for details.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">Early Bird Pricing</span>
              <span className="hidden sm:inline"> - Save up to 50%</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-2">
              Invest in Your AI Future
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Choose the plan that fits your goals. All plans include our core curriculum 
              and access to our thriving community.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.name} direction="up" delay={index * 100}>
                <Tilt
                  className="h-full"
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  scale={1.02}
                  transitionSpeed={2500}
                >
                  <div className={`h-full p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 relative flex flex-col ${
                    plan.highlighted 
                      ? "bg-card border-primary shadow-xl shadow-primary/10" 
                      : "bg-card border-border hover:border-primary/20"
                  }`}>
                    {plan.badge && (
                      <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-medium whitespace-nowrap">
                        {plan.badge}
                      </div>
                    )}
                    
                    <div className="text-center mb-4 sm:mb-6">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center ${
                        plan.highlighted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                      }`}>
                        <plan.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">{plan.description}</p>
                      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                        <span className="text-3xl sm:text-4xl font-bold text-foreground">{plan.price}</span>
                        {plan.originalPrice && (
                          <span className="text-base sm:text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start sm:items-center gap-2 text-xs sm:text-sm">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                          <span className="text-foreground leading-relaxed">{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature) => (
                        <div key={feature} className="flex items-start sm:items-center gap-2 text-xs sm:text-sm opacity-50">
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                          </div>
                          <span className="text-muted-foreground leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {plan.cta === "Contact Us" ? (
                      <a href="mailto:contact@flagskool.com" className="block mt-auto">
                        <Button 
                          className="w-full text-sm sm:text-base" 
                          variant={plan.highlighted ? "default" : "outline"}
                          size="default"
                        >
                          {plan.cta}
                        </Button>
                      </a>
                    ) : (
                      <Link to="/waitlist" className="block mt-auto">
                        <Button 
                          className="w-full text-sm sm:text-base" 
                          variant={plan.highlighted ? "default" : "outline"}
                          size="default"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    )}
                  </div>
                </Tilt>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="down">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 sm:mb-12">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.question} direction="up" delay={index * 50}>
                <div className="p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{faq.question}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
