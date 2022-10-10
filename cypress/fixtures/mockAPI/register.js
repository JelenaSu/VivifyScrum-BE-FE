import { faker } from '@faker-js/faker';

let user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  users: faker.datatype.number({
    'min': 1,
    'max': 10
  })
}

class RegisterMock {

  post({
    email = user.email, 
    password = user.password,
    users = user.users,
    url= "https://cypress-api.vivifyscrum-stage.com/api/v2/register",
    status = 200,
    agreed = true,
  })
    {
      return cy.request({
        failOnStatusCode: false,
          method: 'POST',
          url: url,
          headers:{
            accept:"application/json",
        },
          body: {
            email: email,
            password: password,
            users: users,
            agreed_to_terms: agreed,
            finished_registration: true,
            "g-recaptcha-response": "",
            plan_id: "1",
            plan_type: "yearly",
            referal: null,
            repeatpassword: password
          }
          }).then((response) => {
            expect(response.status).to.eq(status)
          return response
          
      //    expect(intercept.response.statusCode).to.eq(200);
      //    expect(intercept.response.url).to.eq('https://cypress-api.vivifyscrum-stage.com/api/v2/register');
      // loginPage.loginBtn.should('not.exist');
      // return intercept.response
         })
       }
     }
          export const registerMock = new RegisterMock();
