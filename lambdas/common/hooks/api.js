const { useHooks, logEvent, parseEvent, handleUnexpectedError } = require('lambda-hooks')

export const withApiHooks = (lambda, config) =>
  useHooks({
    before: [
      // handleScheduledEvent,
      logEvent, // uses state.config.logger || console.log
      parseEvent, // parses body & headers, sets pathParameters and others if null to empty object.
      // validateEventBody,
    ],
    after: [
    ],
    onError: [
      handleUnexpectedError // catches any unhandled errors
    ],
  },
  config
)(lambda)
