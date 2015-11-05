/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'observable',

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    // var nodeModulesPath = path.join(this.project.addonPackages['ember-observable-shim'].path, 'node_modules');
    // app.import(path.join(nodeModulesPath, 'zen-observable', 'zen-observable.js'), { prepend: true });
    this.importDependencies(app);
  },

  importDependencies: function(app){
    if (arguments.length < 1) {
      throw new Error('Application instance must be passed to import');
    }

    var vendor = this.treePaths.vendor;
    app.import(path.join(vendor, 'zen-observable', 'zen-observable.js'), { prepend: true });
  },

  treeForVendor: function(vendorTree) {
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    var nodeModulesPath = path.join(this.project.addonPackages['ember-observable-shim'].path, 'node_modules');
    var observablePath = path.join(nodeModulesPath, 'zen-observable');

    trees.push(new Funnel(observablePath, {
      destDir: 'zen-observable',
      include: ["zen-observable.js"],
      exclude: ['tests', 'src'].map(function(key) {
        return new RegExp(key + '\.js$');
      })
    }));

    return mergeTrees(trees);
  }

  // treeForAddon: function(tree) {
  //   var srcPath = path.join(this.project.addonPackages['ember-observable-shim'].path, 'node_modules', 'zen-observable', 'src');
  //   var srcTree = this.treeGenerator(srcPath);
  //   return this._super.treeForAddon.call(this, srcTree);
  // }
};
