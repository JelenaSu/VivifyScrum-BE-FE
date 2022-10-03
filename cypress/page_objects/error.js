class Error {

    get errorMsg() {
        return cy.get ('[class="el-form-item__error el-form-item-error--top"]');
    }
}

export const error = new Error();