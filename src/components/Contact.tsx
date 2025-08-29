import {Github, Linkedin, Mail, Phone} from 'lucide-react';
import {useState} from 'react';
import Toast from './Toast';
import { Resend } from 'resend';

type Props = {
    isDarkMode: boolean;
    title: string;
    subtitle: string;
    labels: {
        name: string;
        namePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        message: string;
        messagePlaceholder: string;
        send: string;
    };
    isFr: boolean;
};

export function Contact({isDarkMode, title, subtitle, labels, isFr}: Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({
        isVisible: false,
        type: 'success' as 'success' | 'error',
        message: ''
    });

    const emailAddr = 'anthonyip.pro8@gmail.com';
    const phoneNum = '+33660561869';
    const githubUrl = 'https://github.com/AnthonyIp';
    const linkedinUrl = 'https://linkedin.com/in/anthony-ip-1206';

    // Validation ultra-sécurisée
    const validateField = (field: keyof typeof formData, value: string): string => {
        switch (field) {
            case 'name':
                if (!value.trim()) return isFr ? 'Le nom est requis' : 'Name is required';
                if (value.trim().length < 2) return isFr ? 'Le nom doit contenir au moins 2 caractères' : 'Name must be at least 2 characters';
                if (value.trim().length > 50) return isFr ? 'Le nom ne peut pas dépasser 50 caractères' : 'Name cannot exceed 50 characters';
                if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim())) return isFr ? 'Le nom contient des caractères invalides' : 'Name contains invalid characters';
                return '';
            
            case 'email':
                if (!value.trim()) return isFr ? 'L\'email est requis' : 'Email is required';
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) return isFr ? 'Format d\'email invalide' : 'Invalid email format';
                if (value.trim().length > 100) return isFr ? 'L\'email ne peut pas dépasser 100 caractères' : 'Email cannot exceed 100 characters';
                return '';
            
            case 'message':
                if (!value.trim()) return isFr ? 'Le message est requis' : 'Message is required';
                if (value.trim().length < 10) return isFr ? 'Le message doit contenir au moins 10 caractères' : 'Message must be at least 10 characters';
                if (value.trim().length > 1000) return isFr ? 'Le message ne peut pas dépasser 1000 caractères' : 'Message cannot exceed 1000 characters';
                return '';
            
            default:
                return '';
        }
    };

    // Sanitisation ultra-sécurisée
    const sanitizeInput = (input: string): string => {
        return input
            .trim()
            .replace(/[<>]/g, '') // Supprimer < et >
            .replace(/&/g, '&amp;') // Échapper &
            .replace(/"/g, '&quot;') // Échapper "
            .replace(/'/g, '&#x27;') // Échapper '
            .replace(/\//g, '&#x2F;') // Échapper /
            .substring(0, 1000); // Limite de longueur
    };

    // Protection anti-spam avec honeypot
    const [honeypot, setHoneypot] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        
        // Ignorer le honeypot
        if (name === 'honeypot') {
            setHoneypot(value);
            return;
        }

        setFormData(prev => ({...prev, [name]: value}));
        
        // Validation en temps réel
        const error = validateField(name as keyof typeof formData, value);
        setErrors(prev => ({...prev, [name]: error}));
    };

    const closeToast = () => {
        setToast(prev => ({...prev, isVisible: false}));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1) Validation immédiate
        const newErrors = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
            message: validateField("message", formData.message),
        };
        setErrors(newErrors);

        const firstErrorKey = (Object.entries(newErrors).find(([, err]) => err) || [])[0] as
            | "name"
            | "email"
            | "message"
            | undefined;

        if (firstErrorKey) {
            document.getElementById(firstErrorKey)?.focus();
            setToast({
                isVisible: true,
                type: "error",
                message: isFr ? "Veuillez corriger les erreurs dans le formulaire." : "Please fix the form errors.",
            });
            return;
        }

        // 2) Protection anti-spam
        if (honeypot) {
            console.log('Spam détecté via honeypot');
            setToast({
                isVisible: true,
                type: "error",
                message: isFr ? "Erreur de validation." : "Validation error.",
            });
            return;
        }

        if (isSubmitting) return;
        setIsSubmitting(true);

        // 3) Nettoyage et sanitisation
        const sanitizedData = {
            name: sanitizeInput(formData.name),
            email: sanitizeInput(formData.email),
            message: sanitizeInput(formData.message),
        };

        // 4) Envoi via Resend avec sécurité maximale
        try {
            const resend = new Resend(process.env.RESEND_API_KEY || 'your_resend_api_key_here');
            
            const { data, error } = await resend.emails.send({
                from: 'Portfolio <noreply@anthony-ip.netlify.app>',
                to: ['anthonyip.pro8@gmail.com'],
                subject: 'Nouveau message de contact - Portfolio',
                html: `
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
                `,
                replyTo: sanitizedData.email
            });

            if (error) {
                console.error('Resend error:', error);
                setToast({
                    isVisible: true,
                    type: 'error',
                    message: isFr ? 'Erreur lors de l\'envoi du message.' : 'Error sending message.'
                });
            } else {
                setToast({
                    isVisible: true,
                    type: 'success',
                    message: isFr ? 'Message envoyé avec succès !' : 'Message sent successfully!'
                });
                setFormData({name: '', email: '', message: ''});
                setErrors({name: '', email: '', message: ''});
                setHoneypot(''); // Reset honeypot
            }
        } catch (error) {
            console.error('Resend error:', error);
            setToast({
                isVisible: true,
                type: 'error',
                message: isFr ? 'Erreur lors de l\'envoi du message.' : 'Error sending message.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" aria-labelledby="contact-heading"
                 className={`py-20 ${isDarkMode ? 'bg-gray-900/60' : 'bg-gray-100/60'}`}>
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 id="contact-heading"
                         className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{title}</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
                    <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-600 rounded-lg"><Mail size={24}/></div>
                            <div>
                                <h3 className="text-lg font-semibold">{labels.email}</h3>
                                <a href={`mailto:${emailAddr}`} aria-label={`Email ${emailAddr}`}
                                   className={isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-600'}>{emailAddr}</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-amber-600 rounded-lg"><Phone size={24}/></div>
                            <div>
                                <h3 className="text-lg font-semibold">{isFr ? 'Téléphone' : 'Phone'}</h3>
                                <a href={`tel:${phoneNum}`} aria-label={`Call ${phoneNum}`}
                                   className={isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-600'}>{phoneNum}</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-600 rounded-lg"><Github size={24}/></div>
                            <div>
                                <h3 className="text-lg font-semibold">GitHub</h3>
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                                   aria-label="Open GitHub profile"
                                   className={isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-600'}>{githubUrl.replace('https://', '')}</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-emerald-600 rounded-lg"><Linkedin size={24}/></div>
                            <div>
                                <h3 className="text-lg font-semibold">LinkedIn</h3>
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                                   aria-label="Open LinkedIn profile"
                                   className={isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-600'}>{linkedinUrl.replace('https://', '')}</a>
                            </div>
                        </div>
                        <div>
                            <a href={isFr ? "/cv/cv.pdf" : "/cv/cv-en.pdf"}
                               download
                               className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                               aria-label={isFr ? 'Télécharger mon CV' : 'Download my resume'}
                            >
                                {isFr ? 'Télécharger mon CV' : 'Download my resume'}
                            </a>
                        </div>
                    </div>
                    <div
                        className={`p-8 rounded-lg border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {/* Honeypot anti-spam (caché) */}
                            <div className="hidden">
                                <input
                                    type="text"
                                    name="honeypot"
                                    value={honeypot}
                                    onChange={handleInputChange}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">{labels.name}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 ${
                                        errors.name
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 text-red-900'
                                            : formData.name && !errors.name
                                                ? 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50 text-green-900'
                                                : isDarkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                    placeholder={labels.namePlaceholder}
                                />
                                {
                                    errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )
                                }
                                {
                                    formData.name && !errors.name && (
                                        <p className="mt-1 text-sm text-green-500">✓ Nom valide</p>
                                    )
                                }
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">{labels.email}</label>
                                <input type="email"
                                       id="email"
                                       name="email"
                                       value={formData.email}
                                       onChange={handleInputChange}
                                       required
                                       className={`w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 ${
                                           errors.email
                                               ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 text-red-900'
                                               : formData.email && !errors.email
                                                   ? 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50 text-green-900'
                                                   : isDarkMode
                                                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                       }`}
                                       placeholder={labels.emailPlaceholder}
                                />
                                {
                                    errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )
                                }
                                {
                                    formData.email && !errors.email && (
                                        <p className="mt-1 text-sm text-green-500">✓ Email valide</p>
                                    )
                                }
                            </div>
                            <div>
                                <label htmlFor="message"
                                       className="block text-sm font-medium mb-2">{labels.message}</label>
                                <textarea
                                    rows={4}
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 ${
                                        errors.message
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 text-red-900'
                                            : formData.message && !errors.message
                                                ? 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50 text-green-900'
                                                : isDarkMode
                                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                    placeholder={labels.messagePlaceholder}
                                ></textarea>
                                {
                                    errors.message && (
                                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                    )
                                }
                                {
                                    formData.message && !errors.message && (
                                        <p className="mt-1 text-sm text-green-500">✓ Message valide</p>
                                    )
                                }
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || Object.values(errors).some(e => e !== '')}
                                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                    isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                                }`}
                            >
                                {
                                    isSubmitting
                                        ? (isFr ? 'Envoi en cours...' : 'Sending...')
                                        : labels.send
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Toast de notification */}
            <Toast
                type={toast.type}
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={closeToast}
                duration={4000}
            />
        </section>
    );
}
export default Contact;
