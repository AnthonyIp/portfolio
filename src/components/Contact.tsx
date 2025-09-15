import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import {
  useScrollAnimation,
  useFadeInAnimation,
  useSlideInAnimation,
} from '../hooks/useScrollAnimation';
import { AnimatedButton } from './AnimatedButton';
import { ContactCard } from './ContactCard';

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

  const sectionRef = useScrollAnimation();
  const headerRef = useFadeInAnimation(0.2);
  const cardsRef = useSlideInAnimation('up', 0.4);
  const buttonRef = useFadeInAnimation(0.6);

  return (
    <section
      ref={sectionRef}
      id='contact'
      aria-labelledby='contact-heading'
      className={`py-20 md:py-32 ${isDarkMode ? 'bg-gray-900/60' : 'bg-gray-100/60'}`}
    >
      <div className='max-w-6xl mx-auto px-4 w-full overflow-x-hidden'>
        <div ref={headerRef} className='text-center mb-12 md:mb-16'>
          <h2
            id='contact-heading'
            className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
          >
            {title}
          </h2>
          <div className='w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 md:mb-8'></div>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {subtitle}
          </p>
        </div>

        <div
          ref={cardsRef}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12'
        >
          <ContactCard
            isDarkMode={isDarkMode}
            index={0}
            icon={<Mail size={28} className='text-white' />}
            title={isFr ? 'Email' : 'Email'}
            content={emailAddr}
            href={`mailto:${emailAddr}`}
            iconBg='bg-blue-600'
            hoverColor='hover:border-blue-500/50'
          />
          <ContactCard
            isDarkMode={isDarkMode}
            index={1}
            icon={<Phone size={28} className='text-white' />}
            title={isFr ? 'Téléphone' : 'Phone'}
            content={phoneNum}
            href={`tel:${phoneNum}`}
            iconBg='bg-amber-600'
            hoverColor='hover:border-amber-500/50'
          />
          <ContactCard
            isDarkMode={isDarkMode}
            index={2}
            icon={<Github size={28} className='text-white' />}
            title='GitHub'
            content={githubUrl.replace('https://', '')}
            href={githubUrl}
            isExternal
            iconBg='bg-purple-600'
            hoverColor='hover:border-purple-500/50'
          />
          <ContactCard
            isDarkMode={isDarkMode}
            index={3}
            icon={<Linkedin size={28} className='text-white' />}
            title='LinkedIn'
            content={linkedinUrl.replace('https://', '')}
            href={linkedinUrl}
            isExternal
            iconBg='bg-emerald-600'
            hoverColor='hover:border-emerald-500/50'
          />
        </div>

        <div ref={buttonRef} className='text-center'>
          <AnimatedButton
            href={isFr ? '/cv/cv.pdf' : '/cv/cv-en.pdf'}
            variant='primary'
            size='lg'
            className='inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
          >
            {isFr ? 'Télécharger mon CV' : 'Download my resume'}
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

export default Contact;
