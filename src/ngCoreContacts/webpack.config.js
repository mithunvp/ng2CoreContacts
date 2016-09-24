/// <binding BeforeBuild='Run - Development' />


var environment = (process.env.ASPNETCORE_ENVIRONMENT || "development").trim();
if (environment === "development") {
    module.exports = require('./webpack.dev.js');
} else {
    module.exports = require('./webpack.prod.js');
}