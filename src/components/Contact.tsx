import { Github, Linkedin, Mail, Phone } from 'lucide-react';

type Props = {
  isDarkMode: boolean;
  title: string;
  subtitle: string;
  isFr: boolean;
};

export function Contact({ isDarkMode, title, subtitle, isFr }: Props) {
  const emailAddr = 'anthonyip.pro8@gmail.com';
  const phoneNum = '+33660561869';
  const githubUrl = 'https://github.com/AnthonyIp';
  const linkedinUrl = 'https://linkedin.com/in/anthony-ip-1206';

  return (
    <section
      id='contact'
      aria-labelledby='contact-heading'
      className={`h-screen flex items-center ${isDarkMode ? 'bg-gray-900/60' : 'bg-gray-100/60'}`}
    >
      <div className='max-w-6xl mx-auto px-4 w-full'>
        <div className='text-center mb-16'>
          <h2
            id='contact-heading'
            className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
          >
            {title}
          </h2>
          <div className='w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8'></div>
          <p
            className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {subtitle}
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          <div
            className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/70'
                : 'bg-white border-gray-200 hover:border-blue-500/50 hover:bg-gray-50 shadow-sm hover:shadow-md'
            }`}
          >
            <div className='text-center'>
              <div className='inline-flex p-4 bg-blue-600 rounded-xl mb-4'>
                <Mail size={28} className='text-white' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>
                {isFr ? 'Email' : 'Email'}
              </h3>
              <a
                href={`mailto:${emailAddr}`}
                aria-label={`Email ${emailAddr}`}
                className={`text-sm break-all hover:underline transition-colors ${
                  isDarkMode
                    ? 'text-blue-300 hover:text-blue-200'
                    : 'text-blue-700 hover:text-blue-600'
                }`}
              >
                {emailAddr}
              </a>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700 hover:border-amber-500/50 hover:bg-gray-800/70'
                : 'bg-white border-gray-200 hover:border-amber-500/50 hover:bg-gray-50 shadow-sm hover:shadow-md'
            }`}
          >
            <div className='text-center'>
              <div className='inline-flex p-4 bg-amber-600 rounded-xl mb-4'>
                <Phone size={28} className='text-white' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>
                {isFr ? 'Téléphone' : 'Phone'}
              </h3>
              <a
                href={`tel:${phoneNum}`}
                aria-label={`Call ${phoneNum}`}
                className={`text-sm hover:underline transition-colors ${
                  isDarkMode
                    ? 'text-blue-300 hover:text-blue-200'
                    : 'text-blue-700 hover:text-blue-600'
                }`}
              >
                {phoneNum}
              </a>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50 hover:bg-gray-800/70'
                : 'bg-white border-gray-200 hover:border-purple-500/50 hover:bg-gray-50 shadow-sm hover:shadow-md'
            }`}
          >
            <div className='text-center'>
              <div className='inline-flex p-4 bg-purple-600 rounded-xl mb-4'>
                <Github size={28} className='text-white' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>GitHub</h3>
              <a
                href={githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Open GitHub profile'
                className={`text-sm hover:underline transition-colors ${
                  isDarkMode
                    ? 'text-blue-300 hover:text-blue-200'
                    : 'text-blue-700 hover:text-blue-600'
                }`}
              >
                {githubUrl.replace('https://', '')}
              </a>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-800/50 border-gray-700 hover:border-emerald-500/50 hover:bg-gray-800/70'
                : 'bg-white border-gray-200 hover:border-emerald-500/50 hover:bg-gray-50 shadow-sm hover:shadow-md'
            }`}
          >
            <div className='text-center'>
              <div className='inline-flex p-4 bg-emerald-600 rounded-xl mb-4'>
                <Linkedin size={28} className='text-white' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>LinkedIn</h3>
              <a
                href={linkedinUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Open LinkedIn profile'
                className={`text-sm hover:underline transition-colors ${
                  isDarkMode
                    ? 'text-blue-300 hover:text-blue-200'
                    : 'text-blue-700 hover:text-blue-600'
                }`}
              >
                {linkedinUrl.replace('https://', '')}
              </a>
            </div>
          </div>
        </div>

        <div className='text-center'>
          <a
            href={isFr ? '/cv/cv.pdf' : '/cv/cv-en.pdf'}
            download
            className='inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
            aria-label={isFr ? 'Télécharger mon CV' : 'Download my resume'}
          >
            {isFr ? 'Télécharger mon CV' : 'Download my resume'}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
