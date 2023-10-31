/*
The selected JavaScript code is a function named reportWebVitals that is used to report website vital statistics. This function is typically used in the context of a React application, where it's important to measure the performance of the web application.

Here's a breakdown of what the code does:

    The reportWebVitals function takes one argument, onPerfEntry, which is expected to be a function.

    Inside reportWebVitals, there's a conditional statement that checks if onPerfEntry is defined and if it's an instance of Function. If both conditions are true, it proceeds to the next step.

    It dynamically imports the web-vitals module using the import() function. This returns a promise that resolves to the web-vitals module.

    Once the promise is resolved, it destructures five functions from the web-vitals module: getCLS, getFID, getFCP, getLCP, getTTFB. These functions are used to get various performance metrics:

        getCLS: Cumulative Layout Shift
        getFID: First Input Delay
        getFCP: First Contentful Paint
        getLCP: Largest Contentful Paint
        getTTFB: Time to First Byte
        
    Each of these functions is then called with onPerfEntry as an argument. This means that onPerfEntry should be a function that can handle the data returned by these functions.

    Finally, reportWebVitals is exported as a default export from this module, so it can be imported and used in other parts of the application.
*/
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
