import { CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

type ToastType = 'success' | 'error';

interface ToastProps {
    type: ToastType;
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export function Toast({ type, message, isVisible, onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const bgColor = type === 'success' 
        ? 'bg-green-500' 
        : 'bg-red-500';
    
    const icon = type === 'success' 
        ? <CheckCircle size={20} className="text-white" /> 
        : <XCircle size={20} className="text-white" />;

    return (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
            <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px]`}>
                {icon}
                <span className="flex-1 font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Fermer la notification"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}

export default Toast;
