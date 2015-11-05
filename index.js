/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'observable',

  treeForAddon: function() {
    var srcPath = path.join(this.project.addonPackages['ember-observable-shim'].path, 'node_modules', 'zen-observable', 'src');
    var tree = this.treeGenerator(srcPath);
    return this._super.treeForAddon.call(this, tree);
  }
};
