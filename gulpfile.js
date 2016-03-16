var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.scripts([
        'jquery.min.js',
        'bootstrap.min.js',
        'chartist.min.js',
        'bootstrap-datepicker-mobile.js'
    ]).styles([
        'bootstrap.min.css',
        'bootstrap-theme.min.css',
        'chartist.min.css',
        'style.css'
    ]);

    mix.phpUnit();
});
