const mix = require("laravel-mix");
mix.webpackConfig({
    resolve: {
        extensions: [".js", "*"],
        alias: {
            "@": __dirname + "/resources/js",
            "@src": __dirname + "/resources/",
        },
    },
    devServer: {
        historyApiFallback: true,
        contactBase: './',
        hot: true
    }
});

mix.js("resources/js/app.js", "public/js").react();
mix.js("resources/js/admin_app.js", "public/js").react();
mix.sass("resources/scss/app.scss", "public/css");
