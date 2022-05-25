const mix = require('laravel-mix');
const webpackNodeExternals = require('webpack-node-externals');

mix.ts('resources/js/ssr.tsx', 'public/js')
    .react()
    .alias({
        '@': 'resources/js',
        '@hooks': 'resources/js/hooks',
        '@components': 'resources/js/components',
    })
    .webpackConfig({
        target: 'node',
        externals: [webpackNodeExternals()],
    });
