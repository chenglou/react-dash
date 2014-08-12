[React](http://facebook.github.io/react/) Dash Documentation

This repo is used to generate the docs for [Dash](http://kapeli.com/dash). To update the docset, please read the instructions [here](https://github.com/Kapeli/Dash-User-Contributions#contribute-a-new-docset) (more specifically, "Set up your directory structure"). To generate the docset for your Dash-User-Contributions pull quest, you'd use this repo.

**Note**: if you do wish to update the docset, please notify me by [opening an issue](https://github.com/chenglou/react-dash/issues/new). I'd like to double check everything before you send it off to the Dash repo.

## Instructions

Prerequisites: wget, node and sqlite3. For OS X:

    brew install wget node sqlite3

Clone this repo, cd into it and do:

    npm install
    cd Contents
    mkdir -p Resources/Documents/React
    cd Resources/Documents
    wget -m -p -E -k -np http://facebook.github.io/react/
    mv facebook.github.io/react React
    rm -rf facebook.github.io
    cd ..
    sqlite3 docSet.dsidx 'CREATE TABLE searchIndex(id INTEGER PRIMARY KEY, name TEXT, type TEXT, path TEXT)'
    sqlite3 docSet.dsidx 'CREATE UNIQUE INDEX anchor ON searchIndex (name, type, path)'
    cd ../../src
    mkdir -p docs

Now, copy over some files to `src/docs` from [here](https://github.com/facebook/react/tree/master/docs/docs). (Try `curl` or `git clone` the React repo). Here's a list of the currently indexed files:

- 09.1-animation.md
- 09.2-form-input-binding-sugar.md
- 09.3-class-name-manipulation.md
- 09.4-test-utils.md
- 09.5-clone-with-props.md
- 09.6-update.md
- 09.7-pure-render-mixin.md
- 09.8-perf.md
- ref-01-top-level-api.md
- ref-02-component-api.md
- ref-03-component-specs.md
- ref-04-tags-and-attributes.md
- ref-05-events.md

Some of these files' Dash headers are hardcoded. Please check `src/index.js` for more detail.

Go back to `src/`.

    node index.js
    cd ../
    mkdir React.docset
    cp -r Contents React.docset
    cp src/icon* React.docset

Test the output by clicking on React.docset (importing it into Dash). Then, like it said on [Dash User Contributions](https://github.com/Kapeli/Dash-User-Contributions#contribute-a-new-docset):

    tar --exclude='.DS_Store' -cvzf React.tgz React.docset
