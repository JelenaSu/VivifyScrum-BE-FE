class LoginMock {

    post({
        email="test1238@gmail.com",
        password="test1238",
        grecap = "",
        url='https://cypress-api.vivifyscrum-stage.com/api/v2/login',
    })
      {
      cy.session('Jelena', () => {
          return cy.request({
          failOnStatusCode: false,
          method: 'POST',
          url: url,
          body: {
            email: email,
            password:password,
            "g-recaptcha-response":grecap
          },
        }).then((response) => {
          window.localStorage.setItem("tokenData", response.body.token);
          window.localStorage.setItem("user_id", response.body.user.id);
          window.localStorage.setItem("user", JSON.stringify(response.body.user));
          return response.body.token
        }).then((response) => {
          cy.writeFile("cypress/fixtures/token.json", { tokenData: response });
      
        })
      })
    }
  
}

export const loginMock = new LoginMock()