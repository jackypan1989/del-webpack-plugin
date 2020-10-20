'use strict';

var chalk2 = require('chalk');
var del2 = require('del');
var path2 = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk2__default = /*#__PURE__*/_interopDefaultLegacy(chalk2);
var del2__default = /*#__PURE__*/_interopDefaultLegacy(del2);
var path2__default = /*#__PURE__*/_interopDefaultLegacy(path2);

var __assign = Object.assign;
class DelWebpackPlugin {
  constructor(options) {
    const defaultOptions = {
      info: true,
      keepGeneratedAssets: true,
      exclude: [],
      include: ["**"],
      allowExternal: false
    };
    this.options = __assign(__assign({}, defaultOptions), options);
  }
  apply(compiler) {
    const outputPath = compiler.options.output.path;
    const callback = (stats) => {
      if (stats.hasErrors()) {
        console.log();
        console.log(`${chalk2__default['default'].red("Del Webpack Plugin stopped according to module failed.")}`);
        return;
      }
      const allowExternal = this.options.allowExternal;
      const assetNames = stats.toJson().assets.map((asset) => asset.name);
      const assetPatterns = this.options.keepGeneratedAssets ? assetNames.map((name) => path2__default['default'].join(outputPath, name)) : [];
      const includePatterns = this.options.include.map((name) => path2__default['default'].join(outputPath, name));
      const excludePatterns = this.options.exclude.map((name) => path2__default['default'].join(outputPath, name));
      const allExcludePatterns = [
        outputPath,
        ...excludePatterns,
        ...assetPatterns
      ];
      del2__default['default'](includePatterns, {
        force: allowExternal,
        ignore: allExcludePatterns
      }).then((paths) => {
        if (this.options.info) {
          console.log();
          console.log("===== Del Webpack Plugin ===");
          console.log(`${chalk2__default['default'].green("Added files:")}`);
          assetNames.map((name) => console.log(name));
          console.log();
          console.log(`${chalk2__default['default'].red("Deleted files:")}`);
          paths.map((name) => console.log(path2__default['default'].basename(name)));
          console.log("============================");
          console.log();
        }
      });
    };
    compiler.hooks.done.tap("del-webpack-plugin", callback);
  }
}
module.exports = DelWebpackPlugin;
