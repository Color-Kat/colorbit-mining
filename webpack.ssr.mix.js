const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const webpackNodeExternals = require('webpack-node-externals');

mix.ts('resources/js/ssr.tsx', 'public/js')
    .react()
    .alias({
        '@': 'resources/js',
        '@hooks': 'resources/js/hooks',
        '@assets': 'resources/js/assets',
        '@components': 'resources/js/components'
    })
    .sass('resources/css/app.scss', 'public/css')
    .options({
        postCss: [
            tailwindcss('./tailwind.config.js'),
            require('postcss-import'),
            require('autoprefixer'),
        ]
    })
    .webpackConfig({
        target: 'node',
        externals: [webpackNodeExternals()],
    });
