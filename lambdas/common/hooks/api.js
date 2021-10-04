const { useHooks, logEvent, parseEvent, handleUnexpectedError } = require('lambda-hooks')
const { validateEventBody, validatePathParameters } = require('./custom')

export const withApiHooks = (lambda, config={}) => {
  
  const { bodySchema, pathParametersSchema } = config

  return useHooks({
    
    // start -->
    before: [
      
      // handleScheduledEvent,
      logEvent, // uses state.config.logger || console.log
      parseEvent, // parses body & headers, sets pathParameters and others if null to empty object.
      
      // custom hooks
      bodySchema? validateEventBody: undefined,
      pathParametersSchema? validatePathParameters : undefined
    
    ].filter(Boolean),

    // lambda function is invoked now...

    after: [],
    //        Finish -->|

    onError: [handleUnexpectedError],
    // Finish if errors -->|

  },
    config // can be accessed in all hooks via state.config
  )(lambda)

}
  


