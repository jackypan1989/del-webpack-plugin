const path = require('path');
const del = require('del');

class DelWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    const outputPath = compiler.options.output.path;
    console.log(outputPath);
    compiler.plugin('done', stats => {
      // gather info from compiled files
      const assets = stats.toJson().assets.map(asset => asset.name);
      console.log();
      console.log(assets);
      console.log();

      del.sync(path.join(outputPath, '**'), [{
        ignore: [outputPath, assets[0]]
      }]);
    });
  }
}

module.exports = DelWebpackPlugin;