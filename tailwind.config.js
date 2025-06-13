import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.tsx',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'live-blink': 'live-blink 1.5s ease-in-out infinite',
            },
            keyframes: {
                'live-blink': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.3' },
                }
            }
        },
    },

    plugins: [forms],
};
