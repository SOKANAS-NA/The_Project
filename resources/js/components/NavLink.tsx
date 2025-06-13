import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface Props {
    href: string;
    active?: boolean;
    className?: string;
    children: React.ReactNode;
}

export default function NavLink({ href, active = false, className = '', children }: Props) {
    return (
        <Link
            href={href}
            className={cn(
                'inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none',
                active
                    ? 'border-b-2 border-indigo-400 text-gray-900 focus:border-indigo-700'
                    : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700',
                className
            )}
        >
            {children}
        </Link>
    );
} 