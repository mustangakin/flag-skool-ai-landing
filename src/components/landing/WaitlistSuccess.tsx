import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WaitlistSuccessProps {
  onReset?: () => void;
}

const WaitlistSuccess = ({ onReset }: WaitlistSuccessProps) => {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6 py-8">
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          You're on the list!
        </h3>
        <p className="text-muted-foreground">
          We'll notify you when the cohort opens. Check your email for confirmation.
        </p>
      </div>

      {onReset && (
        <Button onClick={onReset} variant="outline" className="mt-4">
          Submit Another Response
        </Button>
      )}
    </div>
  );
};

export default WaitlistSuccess;

