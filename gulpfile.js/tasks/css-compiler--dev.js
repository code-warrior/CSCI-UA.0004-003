const { src, dest } = require(`gulp`);
const CSSCompiler = require(`gulp-sass`);

module.exports = compileCSSForDev = () => {
    return src([
        `./app/sass/*.scss`,
        `./app/sass/**/*.scss`])
        .pipe(CSSCompiler({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, CSSCompiler.logError))
        .pipe(dest(`./temp/css`));
};

exports.compileCSSForDev;
