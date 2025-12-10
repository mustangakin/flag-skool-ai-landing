import type { VercelRequest, VercelResponse } from '@vercel/node';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 
  'https://flagskool.app.n8n.cloud/webhook/fae982e4-a4e4-4c89-9653-f1085e9ae3ed';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Forward the request to n8n webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    });

    // Check if n8n responded successfully
    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text().catch(() => 'Unknown error');
      return response.status(n8nResponse.status).json({
        success: false,
        message: `Webhook request failed: ${n8nResponse.status} ${n8nResponse.statusText}`,
        error: errorText,
      });
    }

    // Try to parse n8n response
    let responseData;
    try {
      responseData = await n8nResponse.json();
    } catch {
      // If response is not JSON, that's okay
      responseData = { success: true };
    }

    // Return success response
    return response.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      data: responseData,
    });

  } catch (error) {
    console.error('Error proxying to n8n:', error);
    return response.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit form',
    });
  }
}

