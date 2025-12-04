import WaitlistForm from "./WaitlistForm";

const FinalCTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Secure your spot for January.
        </h2>
        <p className="text-muted-foreground mb-8">
          Limited seats available. Join the waitlist to be first in line.
        </p>
        <div className="flex justify-center">
          <WaitlistForm variant="footer" />
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
