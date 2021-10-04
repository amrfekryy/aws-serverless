/* lambda-hooks: https://www.npmjs.com/package/lambda-hooks */

// A Hook is just a function that receives and returns the state object:
interface State {
  event: Event // AWS lambda event
  context: Context // AWS lambda context
  
  exit: boolean // Set to true to quit execution early
  response?: Response // This will contain the response from your lambda after it has been executed. Also this will be returned when exit is true
  error?: Error // If there's an unhandled exception, it will be attached here & your onError handlers will be invoked
  config: any // Config object to provide extra things to your hooks at the point of execution e.g. you might want to pass a logger into logEvent
}

