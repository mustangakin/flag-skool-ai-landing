import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "₦50,000",
    originalPrice: "₦70,000",
    description: "Perfect for individuals getting started with AI",
    icon: Zap,
    features: [
      "Full 8-week curriculum",
      "20+ live sessions",
      "Community access",
      "12 hands-on projects",
      "Completion certificate",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "₦100,000",
    originalPrice: "₦135,000",
    description: "Best value for serious learners",
    icon: Star,
    features: [
      "Everything in Starter",
      "4x 1-on-1 mentorship",
      "Priority support",
      "Resume & portfolio review",
      "Lifetime access",
    ],
    highlighted: true,
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
      "Bulk licensing",
    ],
    highlighted: false,
  },
];

interface PricingPreviewProps {
  children?: React.ReactNode;
}

const PricingPreview = ({ children }: PricingPreviewProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            View Pricing
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Early Bird Pricing - Save up to 50%
            </span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl text-center">
            Choose Your Plan
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            All plans include our core curriculum and access to our thriving community
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative p-5 rounded-xl border transition-all duration-300 flex flex-col ${
                  plan.highlighted
                    ? "bg-card border-primary shadow-lg shadow-primary/10 scale-105"
                    : "bg-card border-border hover:border-primary/20"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="text-center mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                      plan.highlighted
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {plan.description}
                  </p>
                  <div className="mt-3 flex flex-col items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4 flex-grow">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 text-xs"
                    >
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {plan.name === "Enterprise" ? (
                  <a href="mailto:contact@flagskool.com" className="block mt-auto">
                    <Button
                      className="w-full text-sm"
                      variant={plan.highlighted ? "default" : "outline"}
                      size="sm"
                    >
                      Contact Us
                    </Button>
                  </a>
                ) : (
                  <Link
                    to="/waitlist"
                    className="block mt-auto"
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      className="w-full text-sm"
                      variant={plan.highlighted ? "default" : "outline"}
                      size="sm"
                    >
                      Join Waitlist
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Need more details? Check out our full pricing page with FAQs
            </p>
            <Link to="/pricing" onClick={() => setOpen(false)}>
              <Button variant="outline" className="gap-2">
                View Full Pricing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingPreview;
