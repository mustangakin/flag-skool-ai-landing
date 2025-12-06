import WaitlistForm from "./WaitlistForm";
import { Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";

const HeroSection = () => {
  const { ref: countRef, inView: countInView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which image to use based on theme
  const getBackgroundImage = () => {
    if (!mounted) {
      return "/hero-bg-light.jpg"; // Default fallback
    }

    // Use resolvedTheme to handle "system" theme properly
    const currentTheme = resolvedTheme || theme || "light";
    
    if (currentTheme === "dark") {
      return "/hero-bg-dark.jpg";
    } else {
      return "/hero-bg-light.jpg";
    }
  };

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image - Theme Based */}
      <div 
        className="absolute inset-0"
        style={{ 
          zIndex: 0,
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle overlay for text readability - lighter to show image better */}
        <div 
          className={`absolute inset-0 ${
            (resolvedTheme || theme) === "dark" 
              ? "bg-black/30" 
              : "bg-black/20"
          }`}
        ></div>
        {/* Light gradient overlay for subtle text contrast */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${
            (resolvedTheme || theme) === "dark"
              ? "from-black/20 via-transparent to-black/40"
              : "from-black/10 via-transparent to-black/30"
          }`}
        ></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <ScrollReveal direction="down" delay={0}>
          <CountdownTimer />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={100}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Master AI Automation & Engineering in{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient drop-shadow-[0_2px_4px_rgba(239,68,68,0.5)]">
              2026
            </span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={200}>
          <p className="text-lg sm:text-xl text-foreground/95 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] font-medium">
            The complete bootcamp for building Voice Agents, Custom Chatbots, and AI Content Workflows. 
            Stop watching AI happen—start building it.
          </p>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={300}>
          <div id="waitlist" className="flex justify-center mb-8">
            <WaitlistForm />
          </div>
        </ScrollReveal>

        {/* Social proof indicator with animated counter */}
        <ScrollReveal direction="fade" delay={400}>
          <div
            ref={countRef}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-primary/40 shadow-lg text-sm text-foreground"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-semibold text-foreground">
              Join{" "}
              {countInView ? (
                <CountUp end={2000} duration={2} separator="," />
              ) : (
                "2,000"
              )}
              + professionals already ahead
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
