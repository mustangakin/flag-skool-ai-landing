import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema, type WaitlistFormData } from "@/lib/waitlist-schema";
import { submitWaitlistForm } from "@/lib/api/waitlist";
import toast from "react-hot-toast";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowRight } from "lucide-react";
import WaitlistSuccess from "@/components/landing/WaitlistSuccess";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/ui/scroll-reveal";

const AI_KNOWLEDGE_OPTIONS = [
  "Complete Beginner",
  "I've used ChatGPT",
  "I use AI tools daily",
  "Advanced/Developer",
] as const;

const AI_TOOLS_OPTIONS = [
  { value: "ChatGPT/Claude", label: "ChatGPT/Claude" },
  { value: "Midjourney/DALL-E", label: "Midjourney/DALL-E" },
  { value: "n8n/Automation", label: "n8n/Automation" },
  { value: "Stable Diffusion", label: "Stable Diffusion" },
  { value: "None", label: "None" },
] as const;

const COMPUTER_TYPE_OPTIONS = ["Mac", "Windows", "Linux", "Tablet/Mobile"] as const;

const PRIMARY_GOAL_OPTIONS = [
  "Upskilling for Job",
  "Starting an Agency/Business",
  "Personal Project",
  "Just Curious",
] as const;

const WaitlistPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      fullName: "",
      email: "",
      whatsapp: "",
      linkedin: "",
      profession: "",
      aiKnowledge: undefined,
      toolsUsed: [],
      computerType: undefined,
      specs: "",
      primaryGoal: undefined,
      specificOutcome: "",
      consent: false,
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    const loadingToast = toast.loading("Submitting your information...");
    
    try {
      await submitWaitlistForm(data);
      setIsSubmitted(true);
      form.reset();
      toast.dismiss(loadingToast);
      toast.success("🎉 Success! You've been added to the waitlist.", {
        duration: 5000,
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="down">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Join the Waitlist
              </h1>
              <p className="text-lg text-muted-foreground">
                Help us get to know you better so we can tailor the experience for you
              </p>
            </div>
          </ScrollReveal>

          {isSubmitted ? (
            <WaitlistSuccess onReset={() => setIsSubmitted(false)} />
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Contact Info Section */}
                <div className="space-y-6 p-6 rounded-lg border border-border bg-card">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Contact Information</h3>
                    <p className="text-sm text-muted-foreground">Tell us how to reach you</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+1234567890" {...field} />
                          </FormControl>
                          <FormDescription>Include country code</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Skill Assessment Section */}
                <div className="space-y-6 p-6 rounded-lg border border-border bg-card">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Skill Assessment</h3>
                    <p className="text-sm text-muted-foreground">Help us understand your background</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's your profession? *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Software Engineer, Designer, Student" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aiKnowledge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How would you rate your AI knowledge? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AI_KNOWLEDGE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="toolsUsed"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Which AI tools have you used? *</FormLabel>
                          <FormDescription>Select all that apply</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {AI_TOOLS_OPTIONS.map((tool) => (
                            <FormField
                              key={tool.value}
                              control={form.control}
                              name="toolsUsed"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={tool.value}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(tool.value)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, tool.value])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== tool.value
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {tool.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Hardware Section */}
                <div className="space-y-6 p-6 rounded-lg border border-border bg-card">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Hardware</h3>
                    <p className="text-sm text-muted-foreground">What will you be working with?</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="computerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What computer will you use? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your computer type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COMPUTER_TYPE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Computer Specs</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 16GB RAM, M1 Chip, NVIDIA RTX 3060..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Optional - Help us understand your setup</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Goals Section */}
                <div className="space-y-6 p-6 rounded-lg border border-border bg-card">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Your Goals</h3>
                    <p className="text-sm text-muted-foreground">What do you want to achieve?</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="primaryGoal"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Primary Goal *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {PRIMARY_GOAL_OPTIONS.map((option) => (
                              <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {option}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specificOutcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What specific outcome do you want to achieve? *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what you hope to accomplish..."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Be specific about your goals</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Consent Section */}
                <div className="p-6 rounded-lg border border-border bg-card">
                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer">
                            I agree to the community code of conduct *
                          </FormLabel>
                          <FormDescription>
                            By submitting this form, you agree to receive communications from Flag Skool.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Join Priority Waitlist
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaitlistPage;

