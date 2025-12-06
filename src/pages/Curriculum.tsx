import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Workflow, Mic, Code2, Video, Clock, Users, Target, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import Tilt from "react-parallax-tilt";

const modules = [
  {
    week: "Week 1-2",
    icon: Workflow,
    title: "AI Automation Fundamentals",
    description: "Master workflow orchestration with n8n. Build automated pipelines that connect APIs, process data, and trigger intelligent actions.",
    topics: [
      "Introduction to n8n and workflow automation",
      "Connecting APIs and handling data transformations",
      "Building multi-step automated workflows",
      "Error handling and debugging techniques",
    ],
    color: "bg-primary/10 text-primary",
  },
  {
    week: "Week 3-4",
    icon: Mic,
    title: "Voice Agents & Conversational AI",
    description: "Create real-time conversational AI with Vapi. Build voice assistants that understand context and respond naturally.",
    topics: [
      "Setting up Vapi voice agents",
      "Natural language understanding fundamentals",
      "Context management in conversations",
      "Deploying production-ready voice bots",
    ],
    color: "bg-accent text-accent-foreground",
  },
  {
    week: "Week 5-6",
    icon: Code2,
    title: "AI-Powered Development",
    description: "Full-stack development using Cursor. Learn to leverage AI for faster, smarter coding workflows.",
    topics: [
      "Setting up Cursor for AI-assisted coding",
      "Prompt engineering for code generation",
      "Debugging and refactoring with AI",
      "Building full-stack applications efficiently",
    ],
    color: "bg-secondary text-secondary-foreground",
  },
  {
    week: "Week 7-8",
    icon: Video,
    title: "Content Automation Engines",
    description: "Automate video and text creation. Build systems that generate, edit, and publish content at scale.",
    topics: [
      "AI content generation strategies",
      "Video automation with ElevenLabs",
      "Building content pipelines",
      "Scheduling and publishing automation",
    ],
    color: "bg-primary/10 text-primary",
  },
];

const stats = [
  { icon: Clock, value: "8 Weeks", label: "Program Duration" },
  { icon: Users, value: "20+", label: "Live Sessions" },
  { icon: Target, value: "12+", label: "Hands-on Projects" },
  { icon: BookOpen, value: "50+", label: "Resources & Templates" },
];

const Curriculum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <ScrollReveal direction="down">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Complete AI Mastery Curriculum
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              An 8-week intensive program designed to take you from beginner to AI engineer.
              Learn by building real projects with industry-leading tools.
            </p>
          </ScrollReveal>
          
          {/* Stats */}
          <ScrollReveal direction="up" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-card border border-border">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal direction="down">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Program Modules
            </h2>
          </ScrollReveal>
          
          <div className="space-y-8">
            {modules.map((module, index) => (
              <ScrollReveal key={module.title} direction={index % 2 === 0 ? "left" : "right"} delay={index * 100}>
                <Tilt
                  tiltMaxAngleX={2}
                  tiltMaxAngleY={2}
                  scale={1.01}
                  transitionSpeed={2500}
                >
                  <div className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center`}>
                          <module.icon className="w-8 h-8" />
                        </div>
                        <div className="mt-2 text-sm font-medium text-primary">{module.week}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{module.title}</h3>
                        <p className="text-muted-foreground mb-4">{module.description}</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {module.topics.map((topic) => (
                            <div key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Curriculum;
