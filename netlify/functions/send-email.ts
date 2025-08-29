import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { Resend } from 'resend';

// Types sécurisés
interface ContactData {
  name: string;
  email: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

// Validation et sanitisation des données
const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .substring(0, 1000); // Limite de longueur
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 100;
};

const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
  return nameRegex.test(name);
};

const validateMessage = (message: string): boolean => {
  return message.length >= 10 && message.length <= 1000;
};

// Rate limiting simple (en production, utilisez Redis ou similaire)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const limit = rateLimit.get(ip);
  
  if (!limit || now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }
  
  if (limit.count >= 5) { // Max 5 tentatives par minute
    return false;
  }
  
  limit.count++;
  return true;
};

// Template d'email sécurisé
const createEmailTemplate = (data: ContactData): string => {
  const sanitizedName = sanitizeString(data.name);
  const sanitizedEmail = sanitizeString(data.email);
  const sanitizedMessage = sanitizeString(data.message);
  const currentDate = new Date().toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouveau message de contact</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background-color: #f5f5f5;
        }
        .container { 
          max-width: 600px; 
          margin: 20px auto; 
          background: white; 
          border-radius: 12px; 
          overflow: hidden; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0; 
          font-size: 24px; 
          font-weight: 600;
        }
        .header p { 
          margin: 10px 0 0 0; 
          opacity: 0.9; 
          font-size: 16px;
        }
        .content { 
          padding: 30px 20px; 
        }
        .field { 
          margin-bottom: 20px; 
        }
        .label { 
          font-weight: 600; 
          color: #555; 
          margin-bottom: 8px; 
          display: block;
        }
        .value { 
          background: #f8f9fa; 
          padding: 15px; 
          border-left: 4px solid #667eea; 
          border-radius: 4px;
          word-wrap: break-word;
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #eee; 
          color: #666; 
          font-size: 14px; 
        }
        .security-note {
          background: #e8f5e8;
          border: 1px solid #4caf50;
          border-radius: 6px;
          padding: 15px;
          margin-top: 20px;
          color: #2e7d32;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Nouveau message de contact</h1>
          <p>Portfolio Anthony IP</p>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">👤 Nom :</span>
            <div class="value">${sanitizedName}</div>
          </div>
          
          <div class="field">
            <span class="label">📧 Email :</span>
            <div class="value">${sanitizedEmail}</div>
          </div>
          
          <div class="field">
            <span class="label">💬 Message :</span>
            <div class="value">${sanitizedMessage}</div>
          </div>
          
          <div class="security-note">
            <strong>🔒 Sécurité :</strong> Ce message a été validé et sécurisé avant envoi.
          </div>
          
          <div class="footer">
            <p>Envoyé depuis votre portfolio via Netlify Functions + Resend</p>
            <p>Date : ${currentDate}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Handler principal
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
): Promise<{ statusCode: number; body: string }> => {
  try {
    // 1. Vérification de la méthode HTTP
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ 
          success: false, 
          error: 'Method not allowed' 
        } as EmailResponse)
      };
    }

    // 2. Vérification du Content-Type
    const contentType = event.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid content type. Expected application/json' 
        } as EmailResponse)
      };
    }

    // 3. Rate limiting
    const clientIP = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return {
        statusCode: 429,
        body: JSON.stringify({ 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        } as EmailResponse)
      };
    }

    // 4. Parsing et validation du body
    let contactData: ContactData;
    try {
      contactData = JSON.parse(event.body || '{}');
    } catch {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid JSON format' 
        } as EmailResponse)
      };
    }

    // 5. Validation des champs requis
    if (!contactData.name || !contactData.email || !contactData.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields' 
        } as EmailResponse)
      };
    }

    // 6. Validation et sanitisation des données
    const sanitizedData: ContactData = {
      name: sanitizeString(contactData.name),
      email: sanitizeString(contactData.email),
      message: sanitizeString(contactData.message)
    };

    if (!validateName(sanitizedData.name)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid name format' 
        } as EmailResponse)
      };
    }

    if (!validateEmail(sanitizedData.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid email format' 
        } as EmailResponse)
      };
    }

    if (!validateMessage(sanitizedData.message)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Message must be between 10 and 1000 characters' 
        } as EmailResponse)
      };
    }

    // 7. Vérification de la clé API Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          error: 'Server configuration error' 
        } as EmailResponse)
      };
    }

    // 8. Initialisation de Resend
    const resend = new Resend(resendApiKey);

    // 9. Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <noreply@anthony-ip.netlify.app>',
      to: ['anthonyip.pro8@gmail.com'],
      subject: 'Nouveau message de contact - Portfolio',
      html: createEmailTemplate(sanitizedData),
      replyTo: sanitizedData.email
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          error: 'Failed to send email' 
        } as EmailResponse)
      };
    }

    // 10. Succès
    console.log('Email sent successfully:', { 
      to: 'anthonyip.pro8@gmail.com', 
      from: sanitizedData.email,
      timestamp: new Date().toISOString(),
      ip: clientIP
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        data: { id: data?.id }
      } as EmailResponse)
    };

  } catch (error) {
    // 11. Gestion d'erreur globale
    console.error('Unexpected error in send-email function:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      } as EmailResponse)
    };
  }
};
