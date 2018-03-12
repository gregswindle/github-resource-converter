// First ensure that required ENV variables are available

const defaultOptions = require('./default-options')

// If they are, import remaining resources

const csvMediator = require('./csv-mediator')
const githubResourceConverter = require('./github-resource-converter')
const githubResourceLogger = require('./github-resource-logger')
const {noop} = require('lodash')

module.exports = {
  'authenticate': githubResourceConverter.authenticate,

  'config': defaultOptions,

  'csv': csvMediator,

  'issues': {
    'getForRepo': githubResourceConverter.getIssuesForRepo
  },

  'logger': githubResourceLogger,

  'pullRequests': {
    'getForRepo': noop
  }
}
