import ScrollReveal from "@/components/ui/scroll-reveal";
import Tilt from "react-parallax-tilt";

const tools = [
  { name: "n8n", description: "Workflow Automation" },
  { name: "Vapi", description: "Voice AI" },
  { name: "Cursor", description: "AI Coding" },
  { name: "Google AI Studio", description: "LLM Platform" },
  { name: "ElevenLabs", description: "Voice Synthesis" },
];

const StackSection = () => {
  return (
    <section className="py-16 px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal direction="down">
          <p className="text-center text-muted-foreground text-sm font-medium mb-8 uppercase tracking-wider">
            Learn the tools that define the industry
          </p>
        </ScrollReveal>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {tools.map((tool, index) => (
            <ScrollReveal key={tool.name} direction="up" delay={index * 100}>
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.1}
                transitionSpeed={2000}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ef4444"
                glarePosition="all"
              >
                <div className="flex flex-col items-center gap-2 text-center p-4 rounded-xl hover:bg-card transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md group-hover:scale-110">
                    <span className="font-semibold text-primary text-xs transition-colors group-hover:text-primary/80">
                      {tool.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tool.name}</span>
                  <span className="text-xs text-muted-foreground">{tool.description}</span>
                </div>
              </Tilt>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
