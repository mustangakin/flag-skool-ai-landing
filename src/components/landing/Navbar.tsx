import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isWaitlistPage = location.pathname === "/waitlist";
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link
              to="/curriculum"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Curriculum
            </Link>
            <Link
              to="/benefits"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Benefits
            </Link>
            <Link
              to="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Right-side: Theme toggle, button, and hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {!isWaitlistPage && (
              <Link to="/waitlist" className="hidden sm:block">
                <Button
                  size="sm"
                  className="rounded-full px-6"
                >
                  Join Waitlist
                </Button>
              </Link>
            )}

            {isWaitlistPage && (
              <Link to="/" className="hidden sm:block">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full px-6"
                >
                  Back to Home
                </Button>
              </Link>
            )}

            {/* Hamburger menu button - visible on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-auto max-w-5xl mt-2">
            <div className="bg-card/95 border border-border rounded-2xl shadow-lg p-4 space-y-3">
              <Link
                to="/curriculum"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors font-medium"
              >
                Curriculum
              </Link>
              <Link
                to="/benefits"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors font-medium"
              >
                Benefits
              </Link>
              <Link
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors font-medium"
              >
                Pricing
              </Link>
              
              {/* Join Waitlist button in mobile menu */}
              {!isWaitlistPage && (
                <Link to="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl mt-2">
                    Join Waitlist
                  </Button>
                </Link>
              )}
              
              {isWaitlistPage && (
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl mt-2">
                    Back to Home
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
