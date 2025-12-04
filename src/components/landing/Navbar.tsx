import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const isWaitlistPage = location.pathname === "/waitlist";
  const [logoError, setLogoError] = useState(false);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      // If not on home page, navigate first
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        {/* Rounded header bar, similar layout to the reference but using your color system */}
        <div className="mx-auto max-w-5xl bg-card/95 border border-border rounded-2xl shadow-md px-6 h-14 flex items-center justify-between">
          {/* Logo + brand */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            {!logoError ? (
              <img
                src="/logo.png"
                alt="Flag Skool Logo"
                className="h-8 w-auto"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-sm">FS</span>
              </div>
            )}
            <span className="font-semibold text-lg text-foreground">Flag Skool</span>
          </Link>

          {/* Center nav links (only the ones you want) */}
          {!isWaitlistPage && (
            <div className="hidden md:flex items-center gap-6 text-sm">
              <button
                onClick={() => scrollToSection("curriculum")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Curriculum
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Benefits
              </button>
            </div>
          )}

          {/* Right-side button, using your primary (red) color */}
          {!isWaitlistPage && (
            <Link to="/waitlist">
              <Button
                size="sm"
                className="rounded-full px-6"
              >
                Join Waitlist
              </Button>
            </Link>
          )}

          {isWaitlistPage && (
            <Link to="/">
              <Button
                size="sm"
                variant="outline"
                className="rounded-full px-6"
              >
                Back to Home
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
