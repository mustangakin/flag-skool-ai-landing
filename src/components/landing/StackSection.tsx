import React from "react";
import ScrollReveal from "@/components/ui/scroll-reveal";
import * as Icons from "@lobehub/icons";

// Map tool names to custom logo paths (if you have SVG files)
const getCustomLogo = (toolName: string) => {
  const customLogos: Record<string, string> = {
    "Vapi": "/logos/vapi-logo.svg",
    // Add more custom logos here as needed
  };
  return customLogos[toolName] || null;
};

// Map tool names to their icon component names in @lobehub/icons
const getIconComponent = (toolName: string) => {
  const iconMap: Record<string, string> = {
    "n8n": "N8n",
    "Vapi": "Vapi", // This will be skipped if custom logo exists
    "Cursor": "Cursor",
    "Gemini": "Gemini",
    "ElevenLabs": "ElevenLabs",
    "OpenRouter": "OpenRouter",
    "Google": "Google",
    "Google Cloud": "GoogleCloud",
    "Lovable": "Lovable",
    "Tavily": "Tavily",
  };
  
  const iconName = iconMap[toolName];
  if (!iconName) return null;
  
  // Try to get the icon component dynamically
  // Use the default icon component (monochrome/color icon, not .Text variant)
  const IconComponent = (Icons as any)[iconName];
  return IconComponent || null;
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
];

interface ToolItemProps {
  tool: { name: string; description: string };
  index: number;
}

const ToolItem = ({ tool, index }: ToolItemProps) => {
  const [logoError, setLogoError] = React.useState(false);
  const customLogo = getCustomLogo(tool.name);
  const IconComponent = getIconComponent(tool.name);
  
  return (
    <div className="flex flex-col items-center gap-2 text-center p-4 rounded-xl hover:bg-card transition-all duration-300 group cursor-pointer flex-shrink-0 w-[140px] md:w-[160px]">
      <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md group-hover:scale-110 overflow-hidden">
        {customLogo && !logoError ? (
          <img 
            src={customLogo} 
            alt={`${tool.name} logo`}
            className="w-full h-full object-contain p-1"
            onError={() => setLogoError(true)}
          />
        ) : IconComponent ? (
          <IconComponent size={32} />
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
              <ToolItem key={`${tool.name}-${index}`} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;
