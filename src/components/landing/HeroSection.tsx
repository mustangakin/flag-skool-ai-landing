import WaitlistForm from "./WaitlistForm";
import { Calendar } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8">
          <Calendar className="w-4 h-4" />
          Cohort begins January 2025
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
          Master AI Automation & Engineering in 2025.
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          The complete bootcamp for building Voice Agents, Custom Chatbots, and AI Content Workflows. 
          Stop watching AI happen—start building it.
        </p>
        
        <div id="waitlist" className="flex justify-center">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
