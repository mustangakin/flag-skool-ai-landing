import WaitlistForm from "./WaitlistForm";
import { Calendar, Sparkles } from "lucide-react";
import ParticlesBackground from "@/components/ui/particles-background";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { useSpring, animated } from "@react-spring/web";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const { ref: countRef, inView: countInView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img 
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Hero Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      </div>

      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <ScrollReveal direction="down" delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8 border border-border/50 shadow-sm backdrop-blur-sm">
            <Calendar className="w-4 h-4" />
            Cohort begins January 2025
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={100}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Master AI Automation & Engineering in{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient">
              2025
            </span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={200}>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
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
          <div ref={countRef} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>
              Join{" "}
              {countInView && (
                <CountUp
                  end={2000}
                  duration={2}
                  separator=","
                  className="font-semibold text-primary"
                />
              )}
              {!countInView && "2,000"}
              + professionals already ahead
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
