import { Workflow, Mic, Code2, Video } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Tilt from "react-parallax-tilt";

const curriculum = [
  {
    icon: Workflow,
    title: "AI Automation",
    description: "Master workflow orchestration with n8n. Build automated pipelines that connect APIs, process data, and trigger intelligent actions.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Mic,
    title: "Voice Agents",
    description: "Create real-time conversational AI with Vapi. Build voice assistants that understand context and respond naturally.",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Code2,
    title: "Coding with AI",
    description: "Full-stack development using Cursor. Learn to leverage AI for faster, smarter coding workflows.",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Video,
    title: "Content Engines",
    description: "Automate video and text creation. Build systems that generate, edit, and publish content at scale.",
    color: "bg-primary/10 text-primary",
  },
];

const CurriculumGrid = () => {
  return (
    <section id="curriculum" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal direction="down">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What You Will Build
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hands-on projects using industry-leading AI tools
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {curriculum.map((item, index) => (
            <ScrollReveal key={item.title} direction="up" delay={index * 100}>
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={2500}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ef4444"
                glarePosition="all"
              >
                <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Tilt>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumGrid;
