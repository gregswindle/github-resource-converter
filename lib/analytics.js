const Insight = require('insight')
const pkg = require('../package.json')

/*
 * Const dotenv = require('dotenv')
 * Const envConfig = dotenv.config()
 */

// Const githubResourceLogger = require('./github-resource-logger')

const insight = new Insight({
  pkg,

  // 'trackingCode': envConfig.GA_GITHUB_RESOURCE_CONVERTER

  'trackingCode': 'UA-116937023-1'
})

if (!insight.optOut) {
  insight.askPermission()
}
