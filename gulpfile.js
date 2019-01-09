const gulp = require(`gulp`);
const del = require(`del`);
const HTMLPreprocessor = require(`gulp-nunjucks-render`);
const HTMLCompressor = require(`gulp-htmlmin`);
const CSSCompiler = require(`gulp-sass`);
const browserSync = require(`browser-sync`);
const data = require(`gulp-data`);
const reload = browserSync.reload;

/**
 * COMPILE CSS FOR DEV
 */
gulp.task(`compileCSSForDev`, () => {
    return gulp.src([
        `./app/sass/*.scss`,
        `./app/sass/**/*.scss`])
        .pipe(CSSCompiler({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, CSSCompiler.logError))
        .pipe(gulp.dest(`./temp/css`));
});

/**
 * COMPILE CSS FOR PROD
 */
gulp.task(`compileCSSForProd`, () => {
    return gulp.src([
        `./app/sass/*.scss`,
        `./app/sass/**/*.scss`])
        .pipe(CSSCompiler({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, CSSCompiler.logError))
        .pipe(gulp.dest(`./css`));
});

/**
 * COMPILE HTML FOR DEV
 */
gulp.task(`compileHTMLForDev`, () => {
    HTMLPreprocessor.nunjucks.configure({watch: false});

    return gulp.src([
        `./app/views/*.html/`,
        `./app/views/**/*.html/`])
        .pipe(data(function () {
            return require(`./app/models/data.json`);
        }))
        .pipe(data(function () {
            return require(`./app/models/links.json`);
        }))
        .pipe(HTMLPreprocessor())
        .pipe(gulp.dest(`./temp`));
});

/**
 * COMPILE HTML FOR PROD
 */
gulp.task(`compileHTMLForProd`, () => {
    HTMLPreprocessor.nunjucks.configure({watch: false});

    return gulp.src([
        `./app/views/*.html/`,
        `./app/views/**/*.html/`])
        .pipe(data(function () {
            return require(`./app/models/data.json`);
        }))
        .pipe(data(function () {
            return require(`./app/models/links.json`);
        }))
        .pipe(HTMLPreprocessor())
        .pipe(HTMLCompressor({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(`./`));
});

/**
 * BUILD
 */
gulp.task(`build`, [`compileHTMLForProd`, `compileCSSForProd`]);

/**
 * DEFAULT
 */
gulp.task(`default`, [`compileHTMLForDev`, `compileCSSForDev`],
    () => {
        browserSync({
            notify: true,
            port: 9000,
            reloadDelay: 100,
            server: {
                baseDir: [`./temp`, `./app/`]
            }
        });

        gulp.watch([
            `./app/views/*.html`,
            `./app/controllers/**/*.njk`,
            `./app/controllers/*.njk`,
            `./app/sass/*.scss`,
            `./app/models/*.json`
        ],
        [`compileHTMLForDev`, `compileCSSForDev`]).on(`change`, reload);
    }
);

/**
 * CLEAN
 */
gulp.task(`clean`, () => {
    let fs = require(`fs`),
        i,
        foldersToDelete = [`./temp`];

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
