/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'observable',

  included: function(app) {
    var nodeModulesPath = path.join(this.project.addonPackages['ember-observable-shim'].path, 'node_modules');
    app.import(path.join(nodeModulesPath, 'zen-observable', 'zen-observable.js'), { prepend: true });
  }

  // treeForAddon: function(tree) {
  //   var srcPath = path.join(this.project.addonPackages['ember-observable-shim'].path, 'node_modules', 'zen-observable', 'src');
  //   var srcTree = this.treeGenerator(srcPath);
  //   return this._super.treeForAddon.call(this, srcTree);
  // }
};
