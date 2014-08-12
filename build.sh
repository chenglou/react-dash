mkdir -p Contents/Resources/Documents
# fetch the whole doc site
cd Contents/Resources/Documents
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
