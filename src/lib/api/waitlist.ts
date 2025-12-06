import type { WaitlistFormData } from "../waitlist-schema";

export interface WaitlistResponse {
  success: boolean;
  message?: string;
}

/**
 * Submit form data to n8n webhook via Vercel serverless function
 * The serverless function proxies the request to n8n to avoid CORS issues
 * n8n will then populate the Google Sheet automatically
 */
export async function submitWaitlistForm(
  data: WaitlistFormData
): Promise<WaitlistResponse> {
  // Use the API endpoint on the same domain to avoid CORS issues
  const API_ENDPOINT = '/api/submit-waitlist';

  try {
    // Send POST request to our serverless function
    // The serverless function will proxy to n8n
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        message: `HTTP Error: ${response.status} ${response.statusText}` 
      }));
      throw new Error(errorData.message || 'Failed to submit form');
    }

    // Parse the response
    const responseData = await response.json();
    
    console.log('Form submitted successfully:', responseData);
    
    return {
      success: responseData.success ?? true,
      message: responseData.message || "Form submitted successfully",
    };
    
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Provide more specific error messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Failed to connect to server. Please check your internet connection and try again.');
    }
    
    throw error instanceof Error 
      ? error 
      : new Error('Failed to submit form. Please try again.');
  }
}
