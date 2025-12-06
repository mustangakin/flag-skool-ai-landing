import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: January 1, 2026
    const targetDate = new Date("2026-01-01T00:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/90 backdrop-blur-md text-accent-foreground text-sm font-medium mb-8 border border-border/50 shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 hover:glow-badge">
      <Calendar className="w-4 h-4" />
      <span className="flex items-center gap-1.5">
        <span>Cohort begins January 2026 in</span>
        {timeLeft.days > 0 && (
          <span className="font-bold text-primary">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        )}
        {timeLeft.days === 0 && timeLeft.hours > 0 && (
          <span className="font-bold text-primary">
            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        )}
        {timeLeft.days === 0 && timeLeft.hours === 0 && (
          <span className="font-bold text-primary">
            {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        )}
      </span>
    </div>
  );
};

export default CountdownTimer;
