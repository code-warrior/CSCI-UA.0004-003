const { src, dest } = require(`gulp`);
const CSSCompiler = require(`gulp-sass`);

module.exports = compileCSSForProd = () => {
    return src([
        `./app/sass/*.scss`,
        `./app/sass/**/*.scss`])
        .pipe(CSSCompiler({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, CSSCompiler.logError))
        .pipe(dest(`./css`));
};

exports.compileCSSForProd;
