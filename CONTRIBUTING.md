# Contributing

## Opening an Issue

Thanks for contributing! If you think you have found a bug, or have a new feature idea, please make sure it hasn't already been reported. You can search through existing issues and PRs to see if someone has reported one similar to yours.

Next, create a new issue that briefly explains the problem, and provides a bit of background as to the circumstances that triggered it, and steps to reproduce it.

For code issues please include:
* Resonance version
* React version
* Browser version
* A code example or link to a repo, gist or running site.

For visual or layout problems, images or animated gifs can help explain your issue.

## Submitting a Pull Request

Pull requests are always welcome, but before working on a large change, it is best to open an issue first.

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, don't bundle more than one feature or bug fix per pull request. It's always best to create two smaller PRs than one big one.

When adding new features or modifying existing, please attempt to include tests to confirm the new behaviour.

### Branch Structure

All stable releases are tagged ([view tags](https://github.com/sghall/resonance/tags)). At any given time, `master` represents the latest development version of the library. Patches or hotfix releases are prepared on an independent branch.

## Getting started

Please create a new branch from an up to date master on your fork. (Note, urgent hotfixes should be branched off the latest stable release rather than master)

1. Fork the Resonance repository on Github
2. Clone your fork to your local machine `git clone git@github.com:<yourname>/resonance.git`
3. Create a branch `git checkout -b my-topic-branch`
4. Make your changes, lint, then push to to github with `git push --set-upstream origin my-topic-branch`.
5. Visit github and make your pull request.

If you have an existing local repository, please update it before you start, to minimise the chance of merge conflicts.
```js
git remote add upstream git@github.com:sghall/resonance.git
git checkout master
git pull upstream master
git checkout -b my-topic-branch
npm update
```

### The documentation site

```js
npm install
cd docs
npm install
npm start
```
You can now access the documentation site [locally](http://localhost:3000).

### Coding style

Please follow the coding style of the current code base. Resonance uses eslint, so if possible, enable linting in your editor to get realtime feedback. The linting rules are also run when Webpack recompiles your changes, and can be run manually with `npm run lint`.

## Roadmap

More tests.
More documentation.
More examples.

## License

By contributing your code you agree to license your contribution under the MIT license.
