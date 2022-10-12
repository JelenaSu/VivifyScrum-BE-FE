class LoginMock {

    post({
        email="test1238@gmail.com",
        password="test1238",
        grecap = "",
        url='https://cypress-api.vivifyscrum-stage.com/api/v2/login',
    })
        {
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
        return response
        })
    }
}

export const loginMock = new LoginMock()