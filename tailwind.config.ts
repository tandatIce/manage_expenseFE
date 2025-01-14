import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
        './src/PageComponents/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/not-found.tsx',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'not-found': "url('/img/notFound.gif')",
                'header-gradient': 'linear-gradient(to right, #14532d, #4ade80)',
            },
            fontFamily: {
                'roboto-medium': 'var(--font-roboto-medium)',
                'roboto-regular': 'var(--font-roboto-regular)',
                'lexend-regular': 'var(--font-lexend-medium)',
                lexend: 'var(--font-lexend)',
            },
            fontSize: { title: '18px' },
            colors: {
                primary: 'var(--primary)',
                'primary-100': 'var(--primary-100)',
                'primary-200': 'var(--primary-200)',
                'primary-300': 'var(--primary-300)',
                'primary-400': 'var(--primary-400)',
                'primary-600': 'var(--primary-600)',
                'primary-500': 'var(--primary-500)',
                'primary-700': 'var(--primary-700)',
                'primary-800': 'var(--primary-800)',
                'primary-900': 'var(--primary-900)',
                secondnary: 'var(--secondnary)',
                'color-text': 'var(--color-text)',
                'color-text-secondnary': 'var(--color-text-secondnary)',
                'color-text-third': 'var(--color-text-third)',
                'color-border': 'var(--color-border)',
                'color-white': 'var(--background-color-white)',
                'bg-hover-primary': 'var(--bg-hover-primary)',
            },
            boxShadow: {
                custom: '0px 5px 15px rgba(0, 0, 0, 0.35)',
            },

            width: {
                layout: '1200px',
                'left-layout': '70%',
                'right-layout': '30%',
                'support-sidebar': 'var(--width-support-sidebar)',
            },
            padding: {
                'seperate-layout': '12px',
                'support-sidebar': 'var(--width-support-sidebar)',
                section: '24px',
            },
            margin: {
                'seperate-layout': '12px',
                'support-sidebar': 'var(--width-support-sidebar)',
                section: '24px',
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-in-out',
                'fade-out': 'fadeOut 1s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
