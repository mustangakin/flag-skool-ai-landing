import VideoPlayer from "@/components/ui/video-player";
import ScrollReveal from "@/components/ui/scroll-reveal";

interface VideoSectionProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
}

const VideoSection = ({ 
  videoUrl = "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4",
  thumbnailUrl,
  title = "See Flag Skool in Action"
}: VideoSectionProps) => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto max-w-5xl">
        <ScrollReveal direction="down">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Watch how professionals are building AI solutions today
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="relative group">
            <VideoPlayer src={videoUrl} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VideoSection;

