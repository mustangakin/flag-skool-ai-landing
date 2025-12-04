import { z } from "zod";

export const waitlistSchema = z.object({
  // Contact Info
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  whatsapp: z.string().min(10, "WhatsApp number must be at least 10 digits"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),

  // Skill Assessment
  profession: z.string().min(2, "Profession must be at least 2 characters"),
  aiKnowledge: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select your AI knowledge level",
  }),
  toolsUsed: z.array(z.string()).min(1, "Please select at least one tool you've used"),

  // Hardware
  computerType: z.enum(["windows", "mac", "linux", "other"], {
    required_error: "Please select your computer type",
  }),
  specs: z.string().optional(),

  // Goals
  primaryGoal: z.enum(["voice-agents", "chatbots", "content-workflows", "all"], {
    required_error: "Please select your primary goal",
  }),
  specificOutcome: z.string().min(10, "Please describe your specific outcome (at least 10 characters)"),

  // Consent
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

