import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WaitlistFormProps {
  variant?: "hero" | "footer";
}

const WaitlistForm = ({ variant = "hero" }: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    // Navigate to the full waitlist form page
    navigate("/waitlist");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <Input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 bg-background border-border text-foreground placeholder:text-muted-foreground"
        required
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="h-12 px-6 whitespace-nowrap"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Join Priority Waitlist
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
};

export default WaitlistForm;
