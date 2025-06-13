import React from 'react';

interface Props {
    className?: string;
}

export default function ApplicationLogo({ className = '' }: Props) {
    return (
        <div className={`text-xl font-bold text-gray-900 ${className}`}>
            SportNews
        </div>
    );
} 