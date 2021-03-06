/**
 * Catalog service
 */

'use strict';

/**
 * Module dependencies.
 */

var utils = require('../utils');

/**
 * Initialize a new `CatalogService` client.
 */

function CatalogService(consul) {
  this.consul = consul;
}

/**
 * Lists services in a given DC
 */

CatalogService.prototype.list = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  } else if (typeof opts === 'string') {
    opts = { dc: opts };
  }

  opts = utils.normalizeKeys(opts);

  var req = {
    name: 'catalog.service.list',
    path: '/catalog/services',
    query: {},
  };

  utils.options(req, opts);

  this.consul._get(req, utils.body, callback);
};

/**
 * Lists the nodes in a given service
 */

CatalogService.prototype.nodes = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  } else if (typeof opts === 'string') {
    opts = { service: opts };
  }

  opts = utils.normalizeKeys(opts);

  var req = {
    name: 'catalog.service.nodes',
    path: '/catalog/service/{service}',
    params: { service: opts.service },
    query: {},
  };

  if (opts.tag) req.query.tag = opts.tag;

  utils.options(req, opts);

  this.consul._get(req, utils.body, callback);
};

/**
 * Module Exports.
 */

exports.CatalogService = CatalogService;
