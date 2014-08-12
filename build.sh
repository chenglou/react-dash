mkdir -p Contents/Resources/Documents
# create a fresh sqlite db
cd Contents/Resources
sqlite3 docSet.dsidx 'CREATE TABLE searchIndex(id INTEGER PRIMARY KEY, name TEXT, type TEXT, path TEXT)'
sqlite3 docSet.dsidx 'CREATE UNIQUE INDEX anchor ON searchIndex (name, type, path)'
# fetch the whole doc site
cd Documents
wget -m -p -E -k -np http://facebook.github.io/react/
# move it around a bit
mv facebook.github.io/react ./
rm -rf facebook.github.io
cd ../../../
# read the previously fetched doc site and parse it into sqlite
node src/index.js
# bundle up!
mkdir React.docset
cp -r Contents React.docset
cp src/icon* React.docset
