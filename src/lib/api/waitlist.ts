import type { WaitlistFormData } from "../waitlist-schema";

const WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

export interface WaitlistResponse {
  success: boolean;
  message?: string;
}

export async function submitWaitlistForm(
  data: WaitlistFormData
): Promise<WaitlistResponse> {
  if (!WEBHOOK_URL) {
    throw new Error("Webhook URL is not configured");
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to submit form: ${response.status} ${errorText}`
      );
    }

    return {
      success: true,
      message: "Form submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting waitlist form:", error);
    throw error;
  }
}

