import { z } from "zod";

const AI_KNOWLEDGE_OPTIONS = [
  "Complete Beginner",
  "I've used ChatGPT",
  "I use AI tools daily",
  "Advanced/Developer",
] as const;

const TOOLS_USED_OPTIONS = [
  "ChatGPT/Claude",
  "Midjourney/DALL-E",
  "n8n/Automation",
  "Stable Diffusion",
  "None",
] as const;

const COMPUTER_TYPE_OPTIONS = ["Mac", "Windows", "Linux", "Tablet/Mobile"] as const;

const PRIMARY_GOAL_OPTIONS = [
  "Upskilling for Job",
  "Starting an Agency/Business",
  "Personal Project",
  "Just Curious",
] as const;

export const waitlistSchema = z.object({
  // Contact Info
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  whatsapp: z.string().min(10, "WhatsApp number must be at least 10 digits"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),

  // Skill Assessment
  profession: z.string().min(2, "Profession must be at least 2 characters"),
  aiKnowledge: z.enum(AI_KNOWLEDGE_OPTIONS, {
    required_error: "Please select your AI knowledge level",
  }),
  toolsUsed: z
    .array(z.enum(TOOLS_USED_OPTIONS))
    .min(1, "Please select at least one tool you've used"),

  // Hardware
  computerType: z.enum(COMPUTER_TYPE_OPTIONS, {
    required_error: "Please select your computer type",
  }),
  specs: z.string().optional(),

  // Goals
  primaryGoal: z.enum(PRIMARY_GOAL_OPTIONS, {
    required_error: "Please select your primary goal",
  }),
  specificOutcome: z
    .string()
    .min(10, "Please describe your specific outcome (at least 10 characters)"),

  // Consent
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the community code of conduct",
  }),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

