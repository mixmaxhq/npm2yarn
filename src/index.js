const chalk = require('chalk');
const fs = require('fs');
const del = require('del');
const spawnSync = require('child_process').spawnSync;


module.exports = () => {
  console.log(chalk.magenta('\nnpm2yarn.js...\n'));

  // Remove shrinkwrapping.
  const shrinkwrapPath = `${process.cwd()}/npm-shrinkwrap.json`;
  if (fs.existsSync(shrinkwrapPath)) {
    // Remove npm-shrinkwrap.json
    console.log(chalk.blue('\nRemoving `npm-shrinkwrap.json`.'));

    del.sync(shrinkwrapPath);

    if (fs.existsSync(shrinkwrapPath)) {
      console.log(chalk.red('Failed to delete `npm-shrinkwrap.json`'));
      process.exit(1);
    }

    console.log(chalk.blue('Removed `npm-shrinkwrap.json`.'));

    // Uninstall shrinkwrap packages.
    console.log(chalk.blue('\nUninstalling shrinkwrap dependencies.'));
    spawnSync('npm', ['uninstall', '--save-dev', 'npm-shrinkwrap'], {
      stdio: 'inherit'
    });
    spawnSync('npm', ['uninstall', '--save-dev', 'npm-shrinkwrap-check'], {
      stdio: 'inherit'
    });
  }

  // Remove node_modules if they exist in order to avoid any potential installation conflicts.
  const nodeModsPath = `${process.cwd()}/node_modules`;
  if (fs.existsSync(nodeModsPath)) {
    console.log(chalk.blue('\nRemoving `node_modules`.'));

    del.sync(nodeModsPath);

    if (fs.existsSync(nodeModsPath)) {
      console.log(chalk.red('Failed to delete `node_modules`'));
      process.exit(1);
    }

    console.log(chalk.blue('Removed `node_modules`.'));
  }

  // Run `yarn`.
  console.log(chalk.blue('\nInstalling dependencies with yarn; generating `yarn.lock`.'));
  spawnSync('yarn', [] /* empty args */, {
    stdio: 'inherit'
  });

  // Run `yarn check`.
  console.log(chalk.blue('\n`check`ing that your dependencies installed correctly.'));
  spawnSync('yarn', ['check'], {
    stdio: 'inherit'
  });

  // Run tests.
  console.log(chalk.blue('\nRunning `yarn test`.'));
  spawnSync('yarn', ['test'], {
    stdio: 'inherit'
  });

  // Output success.

  // Prepare package.json `scripts` property for output.
  const packageJsonPath = `${process.cwd()}/package.json`;
  const packageJsonFile = fs.readFileSync(packageJsonPath, {
    encoding: 'utf8'
  });
  const packageJsonJson = JSON.parse(packageJsonFile);
  const scripts = packageJsonJson.scripts;

  console.log(chalk.green('\n\nSuccess!\n'));
  console.log('NEXT STEPS:');
  console.log('  1. Update package.json scripts to use Yarn if necessary:');
  console.log('    ', chalk.cyan(JSON.stringify(scripts)));
  console.log('  2. Update the README if necessary');
  console.log('    - Add preferred Yarn-install instruction');
  console.log('    - Update any other npm commands to use Yarn instead');
  console.log('  3. Update your CI configuration if necessary');
  console.log('  4. Perform any additional testing');
  console.log('  5. Commit the changes made');
};
