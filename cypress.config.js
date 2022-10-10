const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl:"https://cypress.vivifyscrum-stage.com/",

    experimentalStudio:true,
    experimentalSessionAndOrigin:true,

    env: {
      validLoginEmail: "test1237@gmail.com",
      validLoginPassword: "test1237"
    },
    watchForFileChanges: false,
    
  },

 
});
