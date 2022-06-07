const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .ts('resources/js/app.tsx', 'public/js')
    .react()
    // .postCss('resources/css/app.css', 'public/css', [
    //     require('postcss-import'),
    //     require('tailwindcss'),
    //     require('autoprefixer'),
    // ])
    .sass('resources/css/app.scss', 'public/css')
    .options({
        postCss: [
            tailwindcss('./tailwind.config.js'),
            require('postcss-import'),
            require('autoprefixer'),
        ]
    })
    .alias({
        '@': 'resources/js',
        '@assets': 'resources/js/assets',
        '@hooks': 'resources/js/hooks',
        '@components': 'resources/js/components'
    })
    .browserSync({injectChanges: true});

if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}
