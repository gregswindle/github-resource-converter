const defaultIssueOptions = require('./default-issue-options')
const defaultOctokitOptions = require('./default-octokit-options')

const defaultOptions = {
  defaultIssueOptions,
  defaultOctokitOptions,
  'defaultOptions': Object.assign({
  }, defaultIssueOptions, defaultOctokitOptions)
}

module.exports = defaultOptions
