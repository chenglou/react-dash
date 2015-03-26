var cheerio = require('cheerio');
var fs = require('fs');
var flatten = require('lodash.flatten');
var indexedFiles = require('./indexedFiles');

// this assumes build1.sh has been run, and the react docs fetched into
// Contents/Resources/Documents/React
function getData() {
  var res = indexedFiles.map(function(a) {
    var path = __dirname + '/../Contents/Resources/Documents/react/docs/' +
      a.name + '.html';
    var src = fs.readFileSync(path, 'utf-8');
    var $ = cheerio.load(src);

    var $headers = $('.inner-content h3, .inner-content h4');

    var names = [];
    var hashes = [];

    $headers.each(function(i, e) {
      var name = $($(e).contents().get(1)).text();
      names.push(name.trim());

      var hash = $($(e).find('a').get(1)).attr('href');
      // cherrio bug? hash includes the bla.html prefix
      hashes.push(hash.slice(hash.indexOf('#') + 1));
    });

    // gosh I'm glad that DOM API's over

    var url = 'react/docs/' + a.name + '.html#';

    var res = names.map(function(n, i) {
      return {
        name: n,
        type: a.type,
        path: url + hashes[i],
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

module.exports = getData;
