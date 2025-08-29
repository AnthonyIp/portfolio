import {Github, Linkedin, Mail, Phone} from 'lucide-react';
import {useState} from 'react';
import Toast from './Toast';

type Props = {
    isDarkMode: boolean;
    title: string;
    subtitle: string;
    labels: {
        email: string;
        github: string;
        linkedin: string;
        name: string;
        namePlaceholder: string;
        emailPlaceholder: string;
        message: string;
        messagePlaceholder: string;
        send: string;
    };
};

export function Contact({isDarkMode, title, subtitle, labels}: Props) {
    const isFr = labels.name === 'Nom';
    const phoneLabel = isFr ? 'Téléphone' : 'Phone';
    const downloadCvText = isFr ? 'Télécharger mon CV' : 'Download my resume';

    // État pour le toast
    const [toast, setToast] = useState<{
        isVisible: boolean;
        type: 'success' | 'error';
        message: string;
    }>({
        isVisible: false,
        type: 'success',
        message: ''
    });

    // État pour le formulaire
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // État pour les erreurs de validation
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    // État pour le chargement
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailAddr = 'anthonyip.pro8@gmail.com';
    const phoneNum = '+33660561869';
    const githubUrl = 'https://github.com/AnthonyIp';
    const linkedinUrl = 'https://linkedin.com/in/anthony-ip-1206';

    // Validation des champs
    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                if (value.length < 2) return 'Le nom doit contenir au moins 2 caractères';
                if (value.length > 50) return 'Le nom ne peut pas dépasser 50 caractères';
                if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) return 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes';
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Format d\'email invalide';
                if (value.length > 100) return 'L\'email ne peut pas dépasser 100 caractères';
                break;
            case 'message':
                if (value.length < 10) return 'Le message doit contenir au moins 10 caractères';
                if (value.length > 1000) return 'Le message ne peut pas dépasser 1000 caractères';
                break;
        }
        return '';
    };

    // Gestion des changements de formulaire avec validation
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        // Mettre à jour le formulaire d'abord
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validation en temps réel avec délai pour éviter trop de calculs
        setTimeout(() => {
            const error = validateField(name, value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }, 300); // Délai de 300ms pour éviter la validation à chaque frappe
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1) validation immédiate
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

        if (isSubmitting) return;
        setIsSubmitting(true);

        // 2) nettoyage
        const sanitizedData = {
            name: formData.name.trim().replace(/[<>]/g, "").replace(/&/g, "&amp;"),
            email: formData.email.trim().toLowerCase().replace(/[<>]/g, "").replace(/&/g, "&amp;"),
            message: formData.message.trim().replace(/[<>]/g, "").replace(/&/g, "&amp;"),
        };
        setFormData(sanitizedData);

        // 3) envoi via Netlify Function + Resend
        try {
            const response = await fetch('/.netlify/functions/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sanitizedData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Succès
                setToast({
                    isVisible: true,
                    type: 'success',
                    message: isFr ? 'Message envoyé avec succès !' : 'Message sent successfully!'
                });
                
                // Réinitialiser le formulaire et les erreurs
                setFormData({name: '', email: '', message: ''});
                setErrors({name: '', email: '', message: ''});
            } else {
                // Erreur avec message détaillé
                const errorMessage = result.error || (isFr ? 'Erreur lors de l\'envoi du message.' : 'Error sending message.');
                setToast({
                    isVisible: true,
                    type: 'error',
                    message: errorMessage
                });
            }
        } catch (error) {
            // Erreur réseau avec détails
            console.error('Network error:', error);
            setToast({
                isVisible: true,
                type: 'error',
                message: isFr ? 'Erreur de connexion. Veuillez réessayer.' : 'Connection error. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fermer le toast
    const closeToast = () => {
        setToast(prev => ({...prev, isVisible: false}));
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
                                <h3 className="text-lg font-semibold">{phoneLabel}</h3>
                                <a href={`tel:${phoneNum}`} aria-label={`Call ${phoneNum}`}
                                   className={isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-600'}>{phoneNum}</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-600 rounded-lg"><Github size={24}/></div>
                            <div>
                                <h3 className="text-lg font-semibold">{labels.github}</h3>
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                                   aria-label="Open GitHub profile"
                                   className={isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-600'}>{githubUrl.replace('https://', '')}</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-emerald-600 rounded-lg"><Linkedin size={24}/></div>
                            <div>
                                <h3 className="text-lg font-semibold">{labels.linkedin}</h3>
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                                   aria-label="Open LinkedIn profile"
                                   className={isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-600'}>{linkedinUrl.replace('https://', '')}</a>
                            </div>
                        </div>
                        <div>
                            <a href={isFr ? "/cv/cv.pdf" : "/cv/cv-en.pdf"}
                               download
                               className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                               aria-label={downloadCvText}
                            >
                                {downloadCvText}
                            </a>
                        </div>
                    </div>
                    <div
                        className={`p-8 rounded-lg border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

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
                                disabled={isSubmitting}
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
