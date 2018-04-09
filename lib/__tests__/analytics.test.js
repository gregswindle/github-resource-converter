const Analytics = require('../analytics')
const noop = require('lodash.noop')

describe('analytics', () => {
  describe('asks for permission to track usage anonymously, and', () => {
    it('checks whether users have opted "in" or "out"', () => {
      const analytics = new Analytics()
      expect(analytics.shouldPromptToOptIn()).toBeDefined()
    })

    it('prompts users to opt-in', () => {
      spyOn(Analytics.prototype, 'askPermission').and.callFake(noop)
      spyOn(Analytics.prototype, 'shouldPromptToOptIn').and.returnValue(true)
      const analytics = new Analytics()
      expect(analytics.askPermission).toHaveBeenCalled()
    })

    it('does not prompt users who have already opted "in" or "out"', () => {
      spyOn(Analytics.prototype, 'askPermission').and.callFake(noop)
      spyOn(Analytics.prototype, 'shouldPromptToOptIn').and.returnValue(false)
      const analytics = new Analytics()
      expect(analytics.askPermission).not.toHaveBeenCalled()
    })
  })
})
