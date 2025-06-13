import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface Props {
    href: string;
    active?: boolean;
    className?: string;
    children: React.ReactNode;
}

export default function ResponsiveNavLink({ href, active = false, className = '', children }: Props) {
    return (
        <Link
            href={href}
            className={cn(
                'block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium transition duration-150 ease-in-out focus:outline-none',
                active
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700 focus:bg-indigo-100 focus:border-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 focus:bg-gray-50 focus:border-gray-300 focus:text-gray-800',
                className
            )}
        >
            {children}
        </Link>
    );
} 