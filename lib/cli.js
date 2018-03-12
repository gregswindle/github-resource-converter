#!/usr/bin/env node

const csvMediator = require('./csv-mediator')
const defaultOptions = require('./default-options')
const fsExtra = require('fs-extra')
const meow = require('meow')

const msg = {
  'usage': `
  Usage
    $ grc [options] [info]
    $ github-resource-converter repo-path [options] [info]
  Options
    --dest, -o       The "CRC Models report" destination directory.
                      [Default: '.']
    --host, -h        The domain name of the server. Set this value
                      for GitHub Enterprise instances.
                      [Default: 'api.github.com']
    --owner, -o       The GitHub account name or organization name.
    --path-prefix, -p For GitHub Enterprise instances, the value that
                      must occur to fulfill a REST API v3 request, e.g.,
                      'api/v3/'.
                      [Default: '']
    --protocol, -s    The access mechanism for a requested resource.
                      [Default: 'https:']
    --repo, -r        The name of the GitHub (or GitHub enterprise)
                      repository.
  Info
    --help        Show this dialog.
    --version     Display the installed semantic version.
  Examples
    $ grc https://github.com/github/scientist
    // => Exported CSV to /path/of/cwd/github-scientist-issues.csv.
    
    $ grc https://github.com/github/scientist -o='./reports/issues/YYYY-MM-DD.csv'
    // => Exported CSV to /path/of/reports/issues/2018-05-10.csv.
    
    $ grc -o='😱 '
    ❌  There was a problem generating your CRC Model report.
        Error: ENOENT: no such file or directory, open '😱 '
  `
}

/**
 * Command-line interface options.
 * @type {object}
 * @memberOf {crc}
 */

const options = {
  'flags': {
    'dest': {
      'alias': 'd',
      'default': './issues.csv',
      'type': 'string'
    },
    'host': {
      'alias': 'h',
      'default': 'api.github.com'
    },
    'owner': {
      'alias': 'o',
      'type': 'string'
    },
    'path-prefix': {
      'alias': 'p',
      'default': '',
      'type': 'string'
    },
    'protocol': {
      'alias': 's',
      'default': 'https:',
      'type': 'string'
    },
    'repo': {
      'alias': 'r',
      'type': 'string'
    }
  }
}

const loadOptions = (cli) => Object.assign({
  'baseUrl': `${cli.flags.protocol}//${cli.flags.host}`,
  'destination': cli.flags.dest,
  'owner': cli.flags.owner,
  'pathPrefix': cli.flags.pathPrefix,
  'repo': cli.flags.repo
}, defaultOptions)

const writeToFile = async (dest, data) => {
  try {
    await fsExtra.outputFile(dest, data)
    console.log('Exporting to "%s"...', dest)
  } catch (err) {
    console.error(err)
  }
}

const convertGitHubResource = async () => {
  const cli = meow(msg.usage, options)
  const opts = loadOptions(cli)
  const data = await csvMediator.issuesToCsv(opts)
  writeToFile(cli.flags.dest, data)
}

const main = () => {
  convertGitHubResource()
}

main()
