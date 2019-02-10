const { series, watch } = require(`gulp`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;

module.exports = serve = () => {
    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 100,
        server: {
            baseDir: [`./temp`, `./app/`]
        }
    });

    watch([
        `./app/views/*.html`,
        `./app/controllers/**/*.njk`,
        `./app/controllers/*.njk`,
        `./app/sass/*.scss`,
        `./app/models/*.json`
    ],
    series(`compileHTMLForDev`, `compileCSSForDev`)
    ).on(`change`, reload);
};

exports.serve;
