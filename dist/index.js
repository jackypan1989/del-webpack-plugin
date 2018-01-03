'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var del = require('del');
var chalk = require('chalk');

var DelWebpackPlugin = function () {
  function DelWebpackPlugin(options) {
    _classCallCheck(this, DelWebpackPlugin);

    this.options = _extends({
      info: true,
      exclude: [],
      include: ['**']
    }, options);
  }

  _createClass(DelWebpackPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      var outputPath = compiler.options.output.path;

      compiler.plugin('done', function (stats) {
        // check all modules work
        if (stats.hasErrors()) {
          console.log();
          console.log('' + chalk.red('Del Webpack Plugin stopped according to module failed.'));
          return;
        }

        // gather info from compiled files
        var assetNames = stats.toJson().assets.map(function (asset) {
          return asset.name;
        });

        // include files, default is all files (**) under working folder
        var includePatterns = _this.options.include.map(function (name) {
          return path.join(outputPath, name);
        });

        // exclude files
        var excludePatterns = [outputPath].concat(_toConsumableArray(_this.options.exclude.map(function (name) {
          return path.join(outputPath, name);
        })), _toConsumableArray(assetNames.map(function (name) {
          return path.join(outputPath, name);
        })));

        // run delete 
        del(includePatterns, {
          ignore: excludePatterns
        }).then(function (paths) {
          if (_this.options.info) {
            console.log();
            console.log('===== Del Webpack Plugin ===');
            console.log('' + chalk.green('Added files:'));
            assetNames.map(function (name) {
              return console.log(name);
            });
            console.log();
            console.log('' + chalk.red('Deleted files:'));
            paths.map(function (name) {
              return console.log(path.basename(name));
            });
            console.log('============================');
            console.log();
          }
        });
      });
    }
  }]);

  return DelWebpackPlugin;
}();

module.exports = DelWebpackPlugin;