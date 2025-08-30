type Props = { isDarkMode: boolean; text: string };

export function Footer({ isDarkMode, text }: Props) {
  return (
    <footer
      className={`py-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center'>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            {text}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
