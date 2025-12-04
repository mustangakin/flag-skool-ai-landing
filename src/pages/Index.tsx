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
          videoUrl="https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4"
          title="See Flag Skool in Action"
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
