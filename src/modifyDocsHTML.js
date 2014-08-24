var cheerio = require('cheerio');
var fs = require('fs');
var indexedFiles = require('./indexedFiles');

// remove the left column and the nav bar so that it fits dash's usually small
// browser screen
indexedFiles.forEach(function(a, i) {
  var path = __dirname + '/../Contents/Resources/Documents/react/docs/' +
    a.name + '.html';
  var src = fs.readFileSync(path, 'utf8');
  var $ = cheerio.load(src);

  $('.nav-main').remove();
  $('.nav-docs').remove();
  $('.container').attr('style', 'min-width:inherit;padding-top:0');
  $('.wrap').attr('style', 'width:inherit;');
  $('.inner-content').attr('style', 'float:none;margin:auto;');
  fs.writeFileSync(path, $.html(), 'utf8');
});
