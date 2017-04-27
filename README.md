# `npm2yarn`

A command-line tool for converting projects that use `npm`, [`npm-shrinkwrap`](https://www.npmjs.com/package/npm-shrinkwrap) (Uber's package for shrinkwrapping), and/or [`npm-shrinkwrap-check`](https://www.npmjs.com/package/npm-shrinkwrap-check) to Yarn.

`npm2yarn` was open-sourced as part of our [*Yarn-ifying Mixmax*](https://mixmax.com/blog/yarn-ifying-mixmax) blog post, which goes into detail about why we decided to move to Yarn, how we did it, and what we learned along the way.

We created `npm2yarn` to ensure that we updated our projects correctly throughout our 75-project sweep of Yarnification.

## Procedure

`npm2yarn`:

1. Checks out the `master` branch
2. Pulls the latest changes
3. Checks out a new branch, `yarnify`, overwriting any existing `yarnify` branch
4. Removes `npm-shrinkwrap.json` if it exists
5. Uninstalls `npm-shrinkwrap` if it exists, updating `package.json`
6. Uninstalls `npm-shrinkwrap-check` if it exists, updating `package.json`
7. Removes `node_modules` to avoid any installation conflicts
8. Installs your project dependencies using Yarn, generating a `yarn.lock` file
9. Runs `yarn check` to ensure that your dependencies were installed correctly (check out [our blog post](https://mixmax.com/blog/yarn-ifying-mixmax) if you encounter any issues in this step)
10. Runs `yarn test` as a sanity check
11. Stages the changes made
12. Logs a list of manual steps to be taken to complete the transition

This conversion will likely involve the upgrading of some/many of your transitive dependencies, so make sure to test thoroughly! :)

## Installation

```sh
$ yarn global add npm2yarn
```
or
```sh
$ npm install -g npm2yarn
```

## Usage

(in the directory of the project to convert, which must be a Git repository)
```
$ npm2yarn
```

## Troubleshooting

Check out our [*Yarn-ifying Mixmax*](https://mixmax.com/blog/yarn-ifying-mixmax) blog post for details on the issues we came across while transitioning to Yarn and how we solved them.

If you're having trouble with the script, please file an issue and we'll check it out!

## Contributing

We welcome your pull requests! Please lint your code.

## Changelog

* 1.0.0 Add initial code
