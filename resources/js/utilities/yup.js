import * as yup from "yup";


const customEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
yup.addMethod(yup.string, 'email', function (message) {
    return this.test(
        'email', // Name of the test
        message || 'Please enter a valid email', // Default error message
        function (value) {
            if (!value) return true; // Allow empty values if not required

            return customEmailRegex.test(value); // Validation logic
        }
    );
});

export default yup;
