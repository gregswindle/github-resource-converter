/* eslint node/no-unpublished-require:0 */
const Insight = require('insight')
const isUndefined = require('lodash.isundefined')
const pkg = require('../package.json')

const defaultParams = {
  pkg,
  'trackingCode': 'UA-116937023-1'
}

class Analytics extends Insight {
  constructor (params = defaultParams) {
    super(params)
    this.promptToOptIn()
  }

  shouldPromptToOptIn () {
    return isUndefined(this.optOut)
  }

  promptToOptIn () {
    if (this.shouldPromptToOptIn()) {
      this.askPermission()
    }
  }
}

module.exports = Analytics
