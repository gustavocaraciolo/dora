import { element, by, ElementFinder } from 'protractor';

export class PaymentMethodComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-payment-method div table .btn-danger'));
    title = element.all(by.css('jhi-payment-method div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PaymentMethodUpdatePage {
    pageTitle = element(by.id('jhi-payment-method-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    paymentMethodInput = element(by.id('field_paymentMethod'));
    descriptionInput = element(by.id('field_description'));
    activeInput = element(by.id('field_active'));
    shopSelect = element(by.id('field_shop'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPaymentMethodInput(paymentMethod) {
        await this.paymentMethodInput.sendKeys(paymentMethod);
    }

    async getPaymentMethodInput() {
        return this.paymentMethodInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    getActiveInput() {
        return this.activeInput;
    }

    async shopSelectLastOption() {
        await this.shopSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async shopSelectOption(option) {
        await this.shopSelect.sendKeys(option);
    }

    getShopSelect(): ElementFinder {
        return this.shopSelect;
    }

    async getShopSelectedOption() {
        return this.shopSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class PaymentMethodDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-paymentMethod-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-paymentMethod'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
