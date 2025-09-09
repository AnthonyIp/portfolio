import { ReactNode } from 'react';
import { useContactCardAnimation } from '../hooks/useCardAnimation';
import { AnimatedLink } from './AnimatedLink';

interface ContactCardProps {
  isDarkMode: boolean;
  index: number;
  icon: ReactNode;
  title: string;
  content: string;
  href: string;
  isExternal?: boolean;
  iconBg: string;
  hoverColor: string;
}

export const ContactCard = ({
  isDarkMode,
  index,
  icon,
  title,
  content,
  href,
  isExternal = false,
  iconBg,
  hoverColor,
}: ContactCardProps) => {
  const cardRef = useContactCardAnimation(index);

  return (
    <div
      ref={cardRef}
      className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
        isDarkMode
          ? `bg-gray-800/50 border-gray-700 ${hoverColor} hover:bg-gray-800/70`
          : `bg-white border-gray-200 ${hoverColor} hover:bg-gray-50 shadow-sm hover:shadow-md`
      }`}
    >
      <div className='text-center'>
        <div className={`inline-flex p-4 ${iconBg} rounded-xl mb-4`}>
          {icon}
        </div>
        <h3 className='text-lg font-semibold mb-2'>{title}</h3>
        <AnimatedLink
          href={href}
          isExternal={isExternal}
          className={`text-sm ${
            isDarkMode
              ? 'text-blue-300 hover:text-blue-200'
              : 'text-blue-700 hover:text-blue-600'
          }`}
        >
          {content}
        </AnimatedLink>
      </div>
    </div>
  );
};
