var Sequelize = require('sequelize');

var fs = require('fs');
var flatten = require('lodash.flatten');
var slug = require('slug');

var indexedFiles = [
  {
    name: '09.1-animation',
    type: 'Component',
    extraHeaders: [
      ['ReactCSSTransitionGroup', 'high-level-api-reactcsstransitiongroup'],
      ['ReactTransitionGroup', 'low-level-api-reacttransitiongroup'],
    ]
  },
  {name: '09.2-form-input-binding-sugar', type: 'Mixin'},
  {
    name: '09.3-class-name-manipulation',
    type: 'Extension',
    extraHeaders: [
      ['classSet', ''],
    ]
  },
  {name: '09.4-test-utils', type: 'Test'},
  {name: '09.5-clone-with-props', type: 'Extension'},
  {
    name: '09.6-update',
    type: 'Extension',
    extraHeaders: [
      ['update.push', 'available-commands'],
      ['update.unshift', 'available-commands'],
      ['update.splice', 'available-commands'],
      ['update.set', 'available-commands'],
      ['update.merge', 'available-commands'],
      ['update.apply', 'available-commands'],
    ]
  },
  {
    name: '09.7-pure-render-mixin',
    type: 'Mixin',
    extraHeaders: [
      ['PureRenderMixin', '']
    ]
  },
  {name: '09.8-perf', type: 'Extension'},
  {name: 'ref-01-top-level-api', type: 'Method'},
  {name: 'ref-02-component-api', type: 'Method'},
  {name: 'ref-03-component-specs', type: 'Interface'},
  {name: 'ref-04-tags-and-attributes', type: 'Tag'},
  {name: 'ref-05-events', type: 'Event'},
];

function convertHeader(s) {
  return slug(s.toLowerCase());
}

var headerRegex = /#{3,} .+/g;

function getHeaders() {
  var res = indexedFiles.map(function(a, i) {
    var path = './docs/' + a.name + '.md';
    var md = fs.readFileSync(path, 'utf-8');

    var headers = md.match(headerRegex);
    headers = headers === null ? [] : headers;

    var url = 'react/docs/' + a.name.replace(/.+?\d+-/, '') + '.html#';

    var res = headers.map(function(h) {
      var header = h.slice(h.indexOf(' ') + 1);
      return {
        name: header,
        type: a.type,
        path: url + convertHeader(header),
      };
    });

    if (a.extraHeaders) {
      res = res.concat(a.extraHeaders.map(function(e) {
        return {
          name: e[0],
          type: a.type,
          path: url + e[1],
        };
      }));
    }

    return res;
  });

  return flatten(res);
}

// db ops
var sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: '../Contents/Resources/docSet.dsidx',
});

var searchIndex = sequelize.define(
  'searchIndex',
  {
    id: {type: Sequelize.INTEGER, autoIncrement: true},
    name: {type: Sequelize.STRING},
    type: {type: Sequelize.STRING},
    path: {type: Sequelize.STRING},
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

searchIndex.sync().success(function() {
  getHeaders().forEach(function(header) {
    var si = searchIndex.build({
      name: header.name,
      type: header.type,
      path: header.path
    });
    si.save();
  });
});
