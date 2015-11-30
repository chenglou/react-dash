# [React](http://facebook.github.io/react/) Dash Documentation

# Warning!
React docset is now officially maintained by Dash and is avaiable _since Dash 3.1.0_. There's no need for this library anymore. Thus, it's now deprecated!

Below is the old instruction.

===

**If you're looking for React documentations for Dash**: they're already in Preferences -> Downloads -> User Contributed. This repo is used to generate those docs. You don't need to touch it unless you want to contribute to it.

To update the docset, please read the instructions [here](https://github.com/Kapeli/Dash-User-Contributions#contribute-a-new-docset) (more specifically, "Set up your directory structure"). To generate the docset for your Dash-User-Contributions pull quest, you'd use this repo.

**Note**: if you do wish to update the docset, please notify me by [opening an issue](https://github.com/chenglou/react-dash/issues/new). I'd like to double check everything before you send it off to the Dash repo.

## Instructions

Prerequisites: wget, node and sqlite3. For OS X:

    brew install wget node sqlite3

Clone this repo, `cd` into it and do:

    npm install
    chmod 777 build.sh
    ./build.sh

The script will:

- Fetch the newest released React documentation from http://facebook.github.io/react/.
- Parse the doc site into a new SQLite database for Dash. The list of files are hardcoded. Please check `src/index.js` for more detail.
- Bundle up the result in a React.docset.

Test the output by clicking on React.docset (importing it into Dash). Then, like it said on [Dash User Contributions](https://github.com/Kapeli/Dash-User-Contributions#contribute-a-new-docset):

    tar --exclude='.DS_Store' -cvzf React.tgz React.docset
