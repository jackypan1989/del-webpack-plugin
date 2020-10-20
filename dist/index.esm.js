import chalk2 from 'chalk';
import del2 from 'del';
import path2 from 'path';

var __assign = Object.assign;
class DelWebpackPlugin {
  constructor(options) {
    this.options = __assign({
      info: true,
      keepGeneratedAssets: true,
      exclude: [],
      include: ["**"],
      allowExternal: false
    }, options);
  }
  apply(compiler) {
    const outputPath = compiler.options.output.path;
    const callback = (stats) => {
      if (stats.hasErrors()) {
        console.log();
        console.log(`${chalk2.red(`Del Webpack Plugin stopped according to module failed.`)}`);
        return;
      }
      const allowExternal = this.options.allowExternal;
      const assetNames = stats.toJson().assets.map((asset) => asset.name);
      const assetPatterns = this.options.keepGeneratedAssets ? assetNames.map((name) => path2.join(outputPath, name)) : [];
      const includePatterns = this.options.include.map((name) => path2.join(outputPath, name));
      const excludePatterns = this.options.exclude.map((name) => path2.join(outputPath, name));
      const allExcludePatterns = [
        outputPath,
        ...excludePatterns,
        ...assetPatterns
      ];
      del2(includePatterns, {
        force: allowExternal,
        ignore: allExcludePatterns
      }).then((paths) => {
        if (this.options.info) {
          console.log();
          console.log(`===== Del Webpack Plugin ===`);
          console.log(`${chalk2.green("Added files:")}`);
          assetNames.map((name) => console.log(name));
          console.log();
          console.log(`${chalk2.red("Deleted files:")}`);
          paths.map((name) => console.log(path2.basename(name)));
          console.log(`============================`);
          console.log();
        }
      });
    };
    if (compiler.hooks) {
      compiler.hooks.done.tap("del-webpack-plugin", callback);
    } else {
      compiler.plugin("done", callback);
    }
  }
}
module.exports = DelWebpackPlugin;
