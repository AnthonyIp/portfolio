import { ReactNode } from 'react';
import { AnimatedLink } from './AnimatedLink';

interface ContactCardProps {
  isDarkMode: boolean;
  icon: ReactNode;
  title: string;
  content: string;
  href: string;
  isExternal?: boolean;
  download?: boolean;
  iconBg: string;
  hoverColor: string;
}

export const ContactCard = ({
  isDarkMode,
  icon,
  title,
  content,
  href,
  isExternal = false,
  download = false,
  iconBg,
  hoverColor,
}: ContactCardProps) => {
  return (
    <div
      className={`p-4 md:p-6 rounded-xl border transition-all duration-300 hover:scale-105 min-h-[160px] flex flex-col justify-center ${
        isDarkMode
          ? `bg-gray-800/50 border-gray-700 ${hoverColor} hover:bg-gray-800/70`
          : `bg-white border-gray-200 ${hoverColor} hover:bg-gray-50 shadow-sm hover:shadow-md`
      }`}
    >
      <div className='text-center'>
        <div className={`inline-flex p-4 ${iconBg} rounded-xl mb-4`}>
          {icon}
        </div>
        <h3 className='text-base md:text-lg font-semibold mb-2 break-words'>
          {title}
        </h3>
        <AnimatedLink
          href={href}
          isExternal={isExternal}
          download={download}
          className={`text-xs md:text-sm break-all ${
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
