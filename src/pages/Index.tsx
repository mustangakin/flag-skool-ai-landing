import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import VideoSection from "@/components/landing/VideoSection";
import StackSection from "@/components/landing/StackSection";
import CurriculumGrid from "@/components/landing/CurriculumGrid";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <VideoSection 
          videoUrl="https://youtu.be/cPgeu9zO_DM?si=GYkS3M1mzhH1kcMu"
          title="See Flag Skool in Action"
          description="create cinematic videos with Nano Banana pro and veo 3"
        />
        <StackSection />
        <CurriculumGrid />
        <BenefitsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
