import type { WaitlistFormData } from "../waitlist-schema";

// n8n webhook URL - can be set via environment variable or defaults to the provided webhook
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 
  import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
  'https://resturantchat.app.n8n.cloud/webhook/fae982e4-a4e4-4c89-9653-f1085e9ae3ed';

export interface WaitlistResponse {
  success: boolean;
  message?: string;
}

/**
 * Submit form data to n8n webhook
 * n8n will then populate the Google Sheet automatically
 */
export async function submitWaitlistForm(
  data: WaitlistFormData
): Promise<WaitlistResponse> {
  if (!N8N_WEBHOOK_URL || N8N_WEBHOOK_URL.trim() === '') {
    throw new Error("n8n webhook URL is not configured. Please set VITE_N8N_WEBHOOK_URL in your environment variables.");
  }

  try {
    // Send POST request to n8n webhook
    // n8n webhooks expect JSON data in the request body
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}. ${errorText}`);
    }

    // Try to parse the response (n8n may return JSON)
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      // If response is not JSON, that's okay - n8n might just return success
      responseData = { success: true };
    }

    console.log('Form submitted successfully to n8n:', responseData);
    
    return {
      success: true,
      message: "Form submitted successfully",
    };
    
  } catch (error) {
    console.error('Error submitting form to n8n:', error);
    
    // Provide more specific error messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Failed to connect to webhook. Please check your internet connection and try again.');
    }
    
    throw error instanceof Error 
      ? error 
      : new Error('Failed to submit form. Please try again.');
  }
}


