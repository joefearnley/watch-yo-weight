var elixir = require('laravel-elixir');

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
});
