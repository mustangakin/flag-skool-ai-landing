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
        <p className="text-center text-muted-foreground text-sm font-medium mb-8 uppercase tracking-wider">
          Learn the tools that define the industry
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {tools.map((tool) => (
            <div 
              key={tool.name} 
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm">
                <span className="font-semibold text-primary text-xs">
                  {tool.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">{tool.name}</span>
              <span className="text-xs text-muted-foreground">{tool.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
