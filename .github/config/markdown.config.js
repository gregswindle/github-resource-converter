/* eslint global-require: "off" */
/* eslint node/no-unpublished-require: "off" */
const markdownMagic = require('markdown-magic')
const markdownMagicDependencyTable = require('markdown-magic-dependency-table')
const markdownMagicEngines = require('markdown-magic-engines')
const markdownMagicPackageScripts = require('markdown-magic-package-scripts')
const path = require('path')

const config = {
  'DEBUG': false,
  'transforms': {
    'DEPENDENCYTABLE': markdownMagicDependencyTable,
    'ENGINES': markdownMagicEngines,
    'SCRIPTS': markdownMagicPackageScripts
  }
}

let markdownPath = path.join(__dirname, '**/*.md')
markdownMagic(markdownPath, config)

markdownPath = path.join(__dirname, '../*.md')
markdownMagic(markdownPath, config)
