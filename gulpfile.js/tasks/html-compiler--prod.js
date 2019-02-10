const { src, dest } = require(`gulp`);
const HTMLPreprocessor = require(`gulp-nunjucks-render`);
const HTMLCompressor = require(`gulp-htmlmin`);
const data = require(`gulp-data`);

module.exports = compileHTMLForProd = () => {
    HTMLPreprocessor.nunjucks.configure({watch: false});

    return src([
        `./app/views/*.html`,
        `./app/views/**/*.html`])
        .pipe(data(function () {
            return require(`../../app/models/data.json`);
        }))
        .pipe(data(function () {
            return require(`../../app/models/links.json`);
        }))
        .pipe(data(function () {
            return require(`../../app/models/sections.json`);
        }))
        .pipe(HTMLPreprocessor())
        .pipe(HTMLCompressor({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(dest(`./`));
};

exports.compileHTMLForProd;
