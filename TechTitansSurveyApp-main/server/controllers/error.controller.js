// error.controller.js
// Import any necessary modules or dependencies
// Example: const SomeModule = require('some-module');
// Define your controller function

function handleError(req, res) {
}

function getErrorMessage(err) {

        let message = '';

        if (err.errors) {
            // Mongoose validation error
            for (const key in err.errors) {
                if (err.errors.hasOwnProperty(key)) {
                    message += `${err.errors[key].message}\n`;
                }
            }
        } else {
            message = 'Unknown error';
        }

        return message.trim(); // Trim any leading or trailing whitespace    
}


// Export the controller function
export default  {
    handleError: handleError,
    getErrorMessage:getErrorMessage
};
