const target = process.env.npm_lifecycle_event;

if (target === 'build' || !target) {
	module.exports = require('./webpack.config.prod');
	console.log("\x1b[32m%s", '--> Bundle using webpack.config.prod.js config');
} else if (target === 'dev') {
	module.exports = require('./webpack.config.development');
	console.log("\x1b[32m", '--> Bundle using webpack.config.development.js config');
}