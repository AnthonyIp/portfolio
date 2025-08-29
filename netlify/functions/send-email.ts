import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

// Types pour la validation
interface EmailRequest {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Validation des données d'entrée
const validateEmailRequest = (data: any): EmailRequest | null => {
  if (!data || typeof data !== 'object') return null;
  
  const { name, email, message, honeypot } = data;
  
  // Validation des champs requis
  if (!name || !email || !message) return null;
  
  // Validation des types
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') return null;
  
  // Validation de la longueur
  if (name.trim().length < 2 || name.trim().length > 50) return null;
  if (email.trim().length > 100) return null;
  if (message.trim().length < 10 || message.trim().length > 1000) return null;
  
  // Validation du format email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) return null;
  
  // Protection anti-spam
  if (honeypot && honeypot.trim() !== '') return null;
  
  return {
    name: name.trim(),
    email: email.trim(),
    message: message.trim()
  };
};

// Sanitisation des données
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .substring(0, 1000);
};

// Template HTML sécurisé
const createEmailTemplate = (data: EmailRequest): string => {
  const sanitizedData = {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    message: sanitizeInput(data.message)
  };

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
                    <div class="value">${sanitizedData.name}</div>
                </div>
                
                <div class="field">
                    <span class="label">📧 Email :</span>
                    <div class="value">${sanitizedData.email}</div>
                </div>
                
                <div class="field">
                    <span class="label">💬 Message :</span>
                    <div class="value">${sanitizedData.message}</div>
                </div>
                
                <div class="security-note">
                    <strong>🔒 Sécurité :</strong> Ce message a été validé et sécurisé avant envoi.
                </div>
                
                <div class="footer">
                    <p>Envoyé depuis votre portfolio via Resend sécurisé</p>
                    <p>Date : ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const handler: Handler = async (event): Promise<{ statusCode: number; body: string }> => {
  // Vérification de la méthode HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Parsing du body
    let body: EmailRequest;
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Invalid JSON' })
      };
    }

    // Validation des données
    const validatedData = validateEmailRequest(body);
    if (!validatedData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Invalid data' })
      };
    }

    // Vérification de la clé API
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: 'Server configuration error' })
      };
    }

    // Initialisation de Resend
    const resend = new Resend(apiKey);

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <noreply@anthony-ip.netlify.app>',
      to: ['anthonyip.pro8@gmail.com'],
      subject: 'Nouveau message de contact - Portfolio',
      html: createEmailTemplate(validatedData),
      replyTo: validatedData.email
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Failed to send email',
          error: error.message 
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        data 
      })
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      })
    };
  }
};
