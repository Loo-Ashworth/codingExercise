const {defineConfig} = require("cypress");

module.exports = defineConfig({
    e2e: {
        retries: 0,
        baseUrl: "https://applicationforlibrarymanagementsystem.onrender.com/",
        defaultCommandTimeout: 1000,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
