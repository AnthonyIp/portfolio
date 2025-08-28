import { useEffect, useRef } from 'react';

interface HoneypotFieldProps {
    name: string;
}

export function HoneypotField({ name }: HoneypotFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Masquer le champ avec CSS
        if (inputRef.current) {
            inputRef.current.style.position = 'absolute';
            inputRef.current.style.left = '-9999px';
            inputRef.current.style.opacity = '0';
            inputRef.current.style.pointerEvents = 'none';
            inputRef.current.style.height = '0';
            inputRef.current.style.width = '0';
            inputRef.current.style.overflow = 'hidden';
        }
    }, []);

    return (
        <input
            ref={inputRef}
            type="text"
            name={name}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
        />
    );
}

export default HoneypotField;
