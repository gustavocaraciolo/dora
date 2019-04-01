import { element, by, ElementFinder } from 'protractor';

export class PaymentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-payment div table .btn-danger'));
    title = element.all(by.css('jhi-payment div h2#page-heading span')).first();

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

export class PaymentUpdatePage {
    pageTitle = element(by.id('jhi-payment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    paymentDateInput = element(by.id('field_paymentDate'));
    paymentProviderInput = element(by.id('field_paymentProvider'));
    amountInput = element(by.id('field_amount'));
    paymentStatusSelect = element(by.id('field_paymentStatus'));
    curencyInput = element(by.id('field_curency'));
    customerNameInput = element(by.id('field_customerName'));
    shopSelect = element(by.id('field_shop'));
    processedBySelect = element(by.id('field_processedBy'));
    paymentMethodSelect = element(by.id('field_paymentMethod'));
    orderSelect = element(by.id('field_order'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPaymentDateInput(paymentDate) {
        await this.paymentDateInput.sendKeys(paymentDate);
    }

    async getPaymentDateInput() {
        return this.paymentDateInput.getAttribute('value');
    }

    async setPaymentProviderInput(paymentProvider) {
        await this.paymentProviderInput.sendKeys(paymentProvider);
    }

    async getPaymentProviderInput() {
        return this.paymentProviderInput.getAttribute('value');
    }

    async setAmountInput(amount) {
        await this.amountInput.sendKeys(amount);
    }

    async getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    async setPaymentStatusSelect(paymentStatus) {
        await this.paymentStatusSelect.sendKeys(paymentStatus);
    }

    async getPaymentStatusSelect() {
        return this.paymentStatusSelect.element(by.css('option:checked')).getText();
    }

    async paymentStatusSelectLastOption() {
        await this.paymentStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setCurencyInput(curency) {
        await this.curencyInput.sendKeys(curency);
    }

    async getCurencyInput() {
        return this.curencyInput.getAttribute('value');
    }

    async setCustomerNameInput(customerName) {
        await this.customerNameInput.sendKeys(customerName);
    }

    async getCustomerNameInput() {
        return this.customerNameInput.getAttribute('value');
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

    async processedBySelectLastOption() {
        await this.processedBySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async processedBySelectOption(option) {
        await this.processedBySelect.sendKeys(option);
    }

    getProcessedBySelect(): ElementFinder {
        return this.processedBySelect;
    }

    async getProcessedBySelectedOption() {
        return this.processedBySelect.element(by.css('option:checked')).getText();
    }

    async paymentMethodSelectLastOption() {
        await this.paymentMethodSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async paymentMethodSelectOption(option) {
        await this.paymentMethodSelect.sendKeys(option);
    }

    getPaymentMethodSelect(): ElementFinder {
        return this.paymentMethodSelect;
    }

    async getPaymentMethodSelectedOption() {
        return this.paymentMethodSelect.element(by.css('option:checked')).getText();
    }

    async orderSelectLastOption() {
        await this.orderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async orderSelectOption(option) {
        await this.orderSelect.sendKeys(option);
    }

    getOrderSelect(): ElementFinder {
        return this.orderSelect;
    }

    async getOrderSelectedOption() {
        return this.orderSelect.element(by.css('option:checked')).getText();
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

export class PaymentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-payment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-payment'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
