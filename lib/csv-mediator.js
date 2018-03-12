const defaultOptions = require('./default-options')
const githubResourceConverter = require('./github-resource-converter')
const jsonexport = require('jsonexport')
const util = require('util')
const {isString} = require('lodash')

const csvMediator = Object.assign(
  {
    async issuesToCsv (options = defaultOptions) {
      const issues = await githubResourceConverter.getIssuesForRepo(options)
      const csv = await csvMediator.toCsv(issues)
      return csv
    },

    async toCsv (data = []) {
      let json = data
      if (isString(data)) {
        json = JSON.parse(data)
      }
      const jsonExporter = util.promisify(jsonexport)
      const csv = await jsonExporter(json)
      return csv
    }
  },
  githubResourceConverter
)

module.exports = csvMediator
