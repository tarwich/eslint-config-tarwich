#!/usr/bin/env node
'use strict';

// Libraries
const co    = require('co');
const fs    = require('fs');
const spawn = require('child_process').spawn;

/**
 * Simple class to make running various functions easier
 */
class MakeRelease {
  /**
   * Report an error
   */
  error(...rest) {
    console.error('ERROR: ');
    console.error(...rest);
    console.error('');
  }

  /**
   * Run a child process and return the output
   *
   * @param {string} command The command to execute
   * @param {array} args The arguments to pass to the command
   *
   * @return {Promise} a promise that will be resolved with the text from the
   * result of the command
   */
  exec(command, args) {
    return new Promise((resolve, reject) => {
      let stdout = '';
      let stderr = '';
      const child = spawn(command, args);

      if (child.stdout) {
        child.stdout.on('data', data => {
          stdout += data.toString();
        });
      }
      if (child.stderr) {
        child.stderr.on('data', data => {
          stderr += data.toString();
        });
      }

      child.on('exit', () => {
        if (stderr) reject(stderr);
        else resolve(stdout.trim());
      });
    });
  }

  /**
   * Parse the command line arugments
   */
  processArguments() {
    // Process the arguments
    for (let i = 2; i < process.argv.length; ++i) {
      const arg = process.argv[i];

      switch (arg) {
        default:
          if (arg[0] === '-') {
            this.errorFatal('Invalid argument: %o', arg);
            this.showUsage();
            process.exit(1);
          }
          else if (this.version) {
            this.errorFatal(
              'Only one version is allowed, received %o and %o',
              this.version,
              arg
            );
            this.showUsage();
            process.exit(1);
          }
          else this.version = arg;

          break;
      }
    }

    // No version supplied -- you're doing it wrong
    if (!this.version) {
      this.error('No version supplied');
      this.showUsage();
      process.exit(1);
    }
  }

  /**
   * Actually make the release
   */
  run() {
    this.processArguments();
    co.call(this, function * () {
      let comment = `Version ${this.version}`;

      // Create a tag for this version
      yield this.exec('git', ['tag', '-am', comment, this.version]);
      // Update the version number in package.json
      let json = require('../package.json');
      json.version = this.version;
      yield this.toPromise(p =>
        fs.writeFile('package.json', JSON.stringify(json, null, '  '), p)
      );
      // Push the version to github
      yield this.exec('git', ['push', 'origin', this.version]);
      // Tell the user that everything is ok
      console.log('Released version %o', this.version);
    })
    .catch(error => {
      console.error(error);
    });
  }

  /**
   * Show the usage information for this application
   */
  showUsage() {
    console.log(`usage: ${process.argv.slice(0, 2)} [options] version
version: The new version to release

--help -h Show this usage information
`);
  }

  /**
   * Convert a regular callback-style function to a promise function
   *
   * @param {function} callback A callback that will be called with the
   * resolver. Your function will receive a single argument, which is the
   * callback that your function will pass to the underlying node function.
   *
   * @return {Promise} a promise that will be resolved with the result of the
   * callback
   */
  toPromise(callback) {
    return new Promise((resolve, reject) => {
      callback((error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }
}

new MakeRelease().run();
