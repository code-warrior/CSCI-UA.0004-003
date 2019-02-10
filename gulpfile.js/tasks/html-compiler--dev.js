const { src, dest } = require(`gulp`);
const HTMLPreprocessor = require(`gulp-nunjucks-render`);
const data = require(`gulp-data`);
const fs = require(`fs`);

module.exports = compileHTMLForDev = () => {
    HTMLPreprocessor.nunjucks.configure({watch: false});

    return src([
        `./app/views/*.html`,
        `./app/views/**/*.html`])
        .pipe(data(function () {
            return JSON.parse(fs.readFileSync(`./app/models/data.json`));
        }))
        .pipe(data(function () {
            return JSON.parse(fs.readFileSync(`./app/models/links.json`));
        }))
        .pipe(data(function () {
            return JSON.parse(fs.readFileSync(`./app/models/sections.json`));
        }))
        .pipe(HTMLPreprocessor())
        .pipe(dest(`./temp`));
};

exports.compileHTMLForDev;
