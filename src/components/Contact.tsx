import {Github, Linkedin, Mail, Phone} from 'lucide-react';

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

    const emailAddr = 'anthonyip@hotmail.fr';
    const phoneNum = '+33660561869';
    const githubUrl = 'https://github.com/AnthonyIp';
    const linkedinUrl = 'https://linkedin.com/in/anthony-ip-1206';

    return (
        <section id="contact" aria-labelledby="contact-heading" className={`py-20 ${isDarkMode ? 'bg-gray-900/60' : 'bg-gray-100/60'}`}>
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
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">{labels.name}</label>
                                <input type="text"
                                       className={`w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                       placeholder={labels.namePlaceholder}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{labels.email}</label>
                                <input type="email"
                                       className={`w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                       placeholder={labels.emailPlaceholder}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{labels.message}</label>
                                <textarea rows={4}
                                          className={`w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                          placeholder={labels.messagePlaceholder}></textarea>
                            </div>
                            <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">{labels.send}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
