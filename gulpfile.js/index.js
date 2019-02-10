const { series } = require(`gulp`);

exports.compileCSSForDev = require(`./tasks/css-compiler--dev`);
exports.compileCSSForProd = require(`./tasks/css-compiler--prod`);
exports.compileHTMLForDev = require(`./tasks/html-compiler--dev`);
exports.compileHTMLForProd = require(`./tasks/html-compiler--prod`);
exports.build = series(
    require(`./tasks/html-compiler--prod`),
    require(`./tasks/css-compiler--prod`)
);
exports.default = series(
    require(`./tasks/html-compiler--dev`),
    require(`./tasks/css-compiler--dev`),
    require(`./tasks/serve`)
);
exports.clean = require(`./tasks/clean`);
