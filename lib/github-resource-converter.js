const defaultOptions = require('./default-options')
const dotenv = require('dotenv')
const githubResourceLogger = require('./github-resource-logger')
const Octokit = require('@octokit/rest')
const {map} = require('lodash')

const envConfig = dotenv.config()

const octokit = new Octokit(defaultOptions)

/*
 * @param {object} credentials
 * @param {string=token} credentials.type
 * @param {string=process.env.GITHUB_ACCESS_TOKEN} credentials.value
 * @param {string} [credentials.user]
 * @see https://github.com/settings/tokens
 */

const authenticate = (credentials = {
  'token': envConfig.required.GITHUB_ACCESS_TOKEN,
  'type': 'token'
}) => octokit.authenticate({
  'token': credentials.token,
  'type': credentials.type
})

const paginate = async (method, options = defaultOptions) => {
  const responses = []
  const response = await method(options)
  while (octokit.hasNextPage(response)) {
    responses.push(octokit.getNextPage(response))
  }
  responses.concat(await Promise.all(responses))
  return map(responses, (resp) => resp.data)
}

/*
 * Const paginate = async (method, options = defaultOptions) => {
 *   let response = await method(options)
 *   let {data} = response
 *   while (octokit.hasNextPage(response)) {
 *     response = await octokit.getNextPage(response)
 *     data = data.concat(response.data)
 *   }
 *   return data
 * }
 */

/**
 * Get all issues in a repository.
 *
 * @see https://octokit.github.io/rest.js/#api-Issues-getForRepo
 */

const getIssuesForRepo = async (options = defaultOptions) => {
  try {
    const issues = await paginate(octokit.issues.getForRepo, options)
    return issues
  } catch (err) {
    githubResourceLogger.error(err)
    return []
  }
}

const githubResourceConverter = {
  authenticate,

  getIssuesForRepo,

  paginate
}

module.exports = githubResourceConverter
