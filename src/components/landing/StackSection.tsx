import React from "react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { useTheme } from "next-themes";

// Logo configuration: local SVG/PNG files
const getLogoUrl = (toolName: string, isDark: boolean): string | null => {
  // Special case for OpenRouter with light/dark variants
  if (toolName === "OpenRouter") {
    return isDark ? "/logos/openrouter-logo-dark.png" : "/logos/openrouter-logo-light.png";
  }
  
  const logoMap: Record<string, string> = {
    // Local logos
    "Google": "/logos/google-color.svg",
    "n8n": "/logos/n8n-logo.png",
    "Vapi": "/logos/vapi-logo.svg",
    "Cursor": "/logos/cursor-logo.svg",
    "Gemini": "/logos/gemini-color.png",
    "ChatGPT": "/logos/openai.svg",
    "ElevenLabs": "/logos/elevenlabs.svg",
    "Google Cloud": "/logos/googlecloud-color.svg",
    "Lovable": "/logos/lovable-color.svg",
    "Tavily": "/logos/tavily-logo.svg",
    "Replit": "/logos/replit-logo.svg",
  };
  return logoMap[toolName] || null;
};

const tools = [
  { 
    name: "n8n", 
    description: "Workflow Automation"
  },
  { 
    name: "Vapi", 
    description: "Voice AI"
  },
  { 
    name: "Cursor", 
    description: "AI Coding"
  },
  { 
    name: "Gemini", 
    description: "LLM Platform"
  },
  { 
    name: "ChatGPT", 
    description: "AI Assistant"
  },
  { 
    name: "ElevenLabs", 
    description: "Voice Synthesis"
  },
  { 
    name: "OpenRouter", 
    description: "AI Router"
  },
  { 
    name: "Google", 
    description: "Search & AI"
  },
  { 
    name: "Google Cloud", 
    description: "Cloud Platform"
  },
  { 
    name: "Lovable", 
    description: "AI Development"
  },
  { 
    name: "Tavily", 
    description: "AI Search"
  },
  { 
    name: "Replit", 
    description: "Cloud IDE"
  },
];

interface ToolItemProps {
  tool: { name: string; description: string };
  index: number;
  isDark: boolean;
}

const ToolItem = ({ tool, index, isDark }: ToolItemProps) => {
  const [logoError, setLogoError] = React.useState(false);
  const logoUrl = getLogoUrl(tool.name, isDark);
  
  return (
    <div className="flex flex-col items-center gap-2 text-center p-4 rounded-xl hover:bg-card transition-all duration-300 group cursor-pointer flex-shrink-0 w-[140px] md:w-[160px]">
      <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md group-hover:scale-110 overflow-hidden">
        {logoUrl && !logoError ? (
          <img 
            src={logoUrl} 
            alt={`${tool.name} logo`}
            className="w-8 h-8 object-contain"
            onError={() => setLogoError(true)}
          />
        ) : (
          <span className="font-semibold text-primary text-xs transition-colors group-hover:text-primary/80">
            {tool.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tool.name}</span>
      <span className="text-xs text-muted-foreground">{tool.description}</span>
    </div>
  );
};

const StackSection = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = mounted && resolvedTheme === "dark";
  
  // Duplicate tools for seamless infinite scroll
  const duplicatedTools = [...tools, ...tools, ...tools];
  
  return (
    <section className="py-16 px-6 bg-muted/50 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <ScrollReveal direction="down">
          <p className="text-center text-muted-foreground text-sm font-medium mb-12 uppercase tracking-wider">
            Learn the tools that define the industry
          </p>
        </ScrollReveal>
        
        {/* Infinite scrolling container */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient masks for fade effect on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling wrapper */}
          <div className="flex animate-scroll">
            {duplicatedTools.map((tool, index) => (
              <ToolItem key={`${tool.name}-${index}`} tool={tool} index={index} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;
