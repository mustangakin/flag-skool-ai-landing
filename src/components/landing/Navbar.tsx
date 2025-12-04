import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">FS</span>
          </div>
          <span className="font-semibold text-lg text-foreground">Flag Skool</span>
        </div>
        <Button onClick={scrollToWaitlist} size="sm">
          Join Waitlist
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
