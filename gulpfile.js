const gulp = require(`gulp`);
const del = require(`del`);
const HTMLPreprocessor = require(`gulp-nunjucks-render`);
const HTMLCompressor = require(`gulp-htmlmin`);
const browserSync = require(`browser-sync`);
const data = require(`gulp-data`);
const reload = browserSync.reload;

/**
 * COMPILE HTML
 */
gulp.task(`compileHTML`, function () {
    HTMLPreprocessor.nunjucks.configure({watch: false});

    return gulp.src([
        `./app/views/*.html/`,
        `./app/views/**/*.html/`])
        .pipe(data(function () {
            return require(`./app/models/data.json`);
        }))
        .pipe(HTMLPreprocessor())
/**
 * COMPILE HTML FOR PROD
 */
gulp.task(`compileHTMLForProd`, function () {
    HTMLPreprocessor.nunjucks.configure({watch: false});

    return gulp.src([
        `./app/views/*.html/`,
        `./app/views/**/*.html/`])
        .pipe(data(function () {
            return require(`./app/models/data.json`);
        }))
        .pipe(HTMLPreprocessor())
        .pipe(HTMLCompressor({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(`./`));
});

/**
 * SERVE
 */
gulp.task(`default`, [`compileHTML`],
    function () {
        browserSync({
            notify: true,
            port: 9000,
            reloadDelay: 100,
            server: {
                baseDir: [`./`, `./app/`]
            }
        });

        gulp.watch([
            `./app/views/*.html`,
            `./app/controllers/**/*.njk`,
            `./app/controllers/*.njk`,
            `./app/css/*.css`
        ],
        [`compileHTML`]).on(`change`, reload);
    });

/**
 * CLEAN
 */
gulp.task(`clean`, function () {
    var fs = require(`fs`),
        i,
        foldersToDelete = [``];

    for (i = 0; i < foldersToDelete.length; i++) {
        try {
            fs.accessSync(foldersToDelete[i], fs.F_OK);
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory was found and will be deleted.\n`);
            del(foldersToDelete[i]);
        } catch (e) {
            process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
                ` directory does NOT exist or is NOT accessible.\n`);
        }
    }

    process.stdout.write(`\n`);
});
