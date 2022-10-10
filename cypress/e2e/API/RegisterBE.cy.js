/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import { registerMock } from '../../fixtures/mockAPI/register';
import data from "../../fixtures/data.json"


let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    users: faker.datatype.number({
        'min': 1,
        'max': 10
    })
}

describe('Register MockAPI BE', () => {

    it('Register Mock', () => {
        registerMock.post({}).then((response) => {
            expect(response.status)
          })
    })

    it('Register NEG - invalid email', () => {
       registerMock.post({email:data.invalidEmail, status:422})
    })

    it('Register NEG - invalid password', () => {
        registerMock.post({password:data.invalidPassword, status:422})
    })

    it('Register NEG - blank email', () => {
        registerMock.post({password:" ", status:422})
    })

    it('Register NEG - blank password', () => {
        registerMock.post({password:" ", status:422})
    })

    it('Register with existing account', () => {
        registerMock.post(Cypress.env("validLoginEmail"), Cypress.env("validLoginPassword"), {status:422})
    })
    
 })


