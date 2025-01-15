/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
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

                'text-color': 'var(--text-color)',
                'text-color-secondnary': 'var(--text-color-secondnary)',
                'text-color-link': 'var(--text-color-link)',
                'text-color-link-hightlight': 'var(--text-color-link-hightlight)',
                'background-color': 'var(--background-color)',
                'background-color-secondnary': 'var(--background-color-secondnary)',
                'background-button': 'var(--background-button)',
                'background-button-red': 'var(--background-button-red)',
                'default-layout-header-height': '--default-layout-header-height',
                'height-chatAI': '--height-chatAI',
            },
        },
    },
    plugins: [],
};
