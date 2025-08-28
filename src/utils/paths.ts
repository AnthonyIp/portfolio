// Utility function to get the correct base path
export function getBasePath(): string {
    // In development, Vite serves from root
    // In production, we're in /portfolio/ subdirectory
    return import.meta.env.DEV ? '/' : '/portfolio/';
}

// Helper to resolve asset paths
export function resolvePath(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // In development, Vite serves public files from root
    // In production, use relative paths
    return import.meta.env.DEV ? `/${cleanPath}` : `./${cleanPath}`;
}
