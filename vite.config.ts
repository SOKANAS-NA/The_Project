import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'localhost',
        port: 5173,
        hmr: {
            host: 'localhost',
        },
    },
    optimizeDeps: {
        include: [
            '@radix-ui/react-slot',
            'class-variance-authority',
            'lucide-react',
            '@inertiajs/react',
            'react',
            'react-dom'
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': [
                        'react',
                        'react-dom',
                        '@inertiajs/react',
                        '@radix-ui/react-slot',
                        'class-variance-authority',
                        'lucide-react'
                    ]
                }
            }
        }
    }
});
