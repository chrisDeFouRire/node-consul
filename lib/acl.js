/**
 * ACL manipulation
 */

'use strict';

/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * Initialize a new `Acl` client.
 */

function Acl(consul) {
  this.consul = consul;
}

/**
 * Creates a new token with policy
 */

Acl.prototype.create = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  }

  opts = utils.normalizeKeys(opts);

  var req = {
    name: 'acl.create',
    path: '/acl/create',
    query: {},
    type: 'json',
    body: {},
  };

  if (opts.name) req.body.Name = opts.name;
  if (opts.type) req.body.Type = opts.type;
  if (opts.rules) req.body.Rules = opts.rules;

  utils.options(req, opts);

  this.consul._put(req, utils.body, callback);
};

/**
 * Update the policy of a token
 */

Acl.prototype.update = function(opts, callback) {
  opts = utils.normalizeKeys(opts);

  var req = {
    name: 'acl.update',
    path: '/acl/update',
    query: {},
    type: 'json',
    body: {},
  };

  if (!opts.id) return callback(this.consul._err('id required', req));

  req.body.ID = opts.id;

  if (opts.name) req.body.Name = opts.name;
  if (opts.type) req.body.Type = opts.type;
  if (opts.rules) req.body.Rules = opts.rules;

  utils.options(req, opts);

  this.consul._put(req, utils.empty, callback);
};

/**
 * Destroys a given token
 */

Acl.prototype.destroy = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { id: opts };
  }

  opts = utils.normalizeKeys(opts);

  var req = {
    name: 'acl.destroy',
    path: '/acl/destroy/{id}',
    params: { id: opts.id },
    query: {},
  };

  if (!opts.id) return callback(this.consul._err('id required', req));

  utils.options(req, opts);

  this.consul._put(req, utils.empty, callback);
};

/**
 * Queries the policy of a given token
 */

Acl.prototype.info = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { id: opts };
  }

  opts = utils.normalizeKeys(opts);

  var req = {
    name: 'acl.info',
    path: '/acl/info/{id}',
    params: { id: opts.id },
    query: {},
  };

  if (!opts.id) return callback(this.consul._err('id required', req));

  utils.options(req, opts);

  this.consul._get(req, function(err, res) {
    if (err) return callback(err, undefined, res);

    if (res.body && res.body.length) {
      return callback(null, res.body[0], res);
    }

    callback(undefined, undefined, res);
  });
};

Acl.prototype.get = Acl.prototype.info;

/**
 * Creates a new token by cloning an existing token
 */

Acl.prototype.clone = function(opts, callback) {
  if (typeof opts === 'string') {
    opts = { id: opts };
  }

  opts = utils.normalizeKeys(opts);

  var req = {
    name: 'acl.clone',
    path: '/acl/clone/{id}',
    params: { id: opts.id },
    query: {},
  };

  if (!opts.id) return callback(this.consul._err('id required', req));

  utils.options(req, opts);

  this.consul._put(req, utils.body, callback);
};

/**
 * Lists all the active tokens
 */

Acl.prototype.list = function(opts, callback) {
  if (!callback) {
    callback = opts;
    opts = {};
  }

  opts = utils.normalizeKeys(opts);

  var req = {
    name: 'acl.list',
    path: '/acl/list',
    query: {},
  };

  utils.options(req, opts);

  this.consul._get(req, utils.body, callback);
};

/**
 * Module exports.
 */

exports.Acl = Acl;
