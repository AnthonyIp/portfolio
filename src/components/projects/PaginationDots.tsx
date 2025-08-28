type PaginationDotsProps = {
    currentPage: number;
    totalPages: number;
    isDarkMode: boolean;
    onPageChange: (page: number) => void;
};

export const PaginationDots = ({currentPage, totalPages, isDarkMode, onPageChange}: PaginationDotsProps) => (
    <div className="mt-10 flex items-center justify-center gap-2">
        {
            Array.from({length: totalPages}).map((_, index) => (
                <button
                    key={index}
                    aria-label={`Page ${index + 1}`}
                    onClick={() => onPageChange(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-200 ${
                        currentPage === index
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-110 shadow'
                            : isDarkMode
                                ? 'bg-gray-600 hover:bg-gray-500'
                                : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
            ))
        }
    </div>
);
