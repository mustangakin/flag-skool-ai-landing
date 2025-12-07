import { motion } from "framer-motion";
import VideoPlayer from "@/components/ui/video-player";
import ScrollReveal from "@/components/ui/scroll-reveal";

interface VideoSectionProps {
  videoUrl?: string;
  youtubeVideoId?: string; // Add this new prop
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const VideoSection = ({ 
  videoUrl,
  youtubeVideoId,
  thumbnailUrl,
  title = "See Flag Skool in Action",
  description
}: VideoSectionProps) => {
  // Determine if we should use YouTube embed
  const youtubeId = youtubeVideoId || (videoUrl ? getYouTubeVideoId(videoUrl) : null);
  const isYouTube = !!youtubeId;

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
              {description || title}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="relative group">
            {isYouTube ? (
              <motion.div
                className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            ) : (
              <VideoPlayer src={videoUrl || "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4"} />
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VideoSection;

