import WaitlistForm from "./WaitlistForm";
import ScrollReveal from "@/components/ui/scroll-reveal";

const FinalCTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto max-w-2xl text-center relative z-10">
        <ScrollReveal direction="down">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Secure your spot for January.
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <p className="text-muted-foreground mb-8">
            Limited seats available. Join the waitlist to be first in line.
          </p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <div className="flex justify-center">
            <WaitlistForm variant="footer" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCTA;
