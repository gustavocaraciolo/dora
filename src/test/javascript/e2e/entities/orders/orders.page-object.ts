import { element, by, ElementFinder } from 'protractor';

export class OrdersComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-orders div table .btn-danger'));
    title = element.all(by.css('jhi-orders div h2#page-heading span')).first();

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

export class OrdersUpdatePage {
    pageTitle = element(by.id('jhi-orders-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    customerNameInput = element(by.id('field_customerName'));
    totalPriceInput = element(by.id('field_totalPrice'));
    quantityInput = element(by.id('field_quantity'));
    discountPercentageInput = element(by.id('field_discountPercentage'));
    discountAmountInput = element(by.id('field_discountAmount'));
    taxPercentageInput = element(by.id('field_taxPercentage'));
    taxAmountInput = element(by.id('field_taxAmount'));
    orderStatusSelect = element(by.id('field_orderStatus'));
    noteInput = element(by.id('field_note'));
    orderDateInput = element(by.id('field_orderDate'));
    isVariantOrderInput = element(by.id('field_isVariantOrder'));
    paymentMethodSelect = element(by.id('field_paymentMethod'));
    soldBySelect = element(by.id('field_soldBy'));
    preparedBySelect = element(by.id('field_preparedBy'));
    shopDeviceSelect = element(by.id('field_shopDevice'));
    sectionTableSelect = element(by.id('field_sectionTable'));
    shopSelect = element(by.id('field_shop'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setCustomerNameInput(customerName) {
        await this.customerNameInput.sendKeys(customerName);
    }

    async getCustomerNameInput() {
        return this.customerNameInput.getAttribute('value');
    }

    async setTotalPriceInput(totalPrice) {
        await this.totalPriceInput.sendKeys(totalPrice);
    }

    async getTotalPriceInput() {
        return this.totalPriceInput.getAttribute('value');
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    async setDiscountPercentageInput(discountPercentage) {
        await this.discountPercentageInput.sendKeys(discountPercentage);
    }

    async getDiscountPercentageInput() {
        return this.discountPercentageInput.getAttribute('value');
    }

    async setDiscountAmountInput(discountAmount) {
        await this.discountAmountInput.sendKeys(discountAmount);
    }

    async getDiscountAmountInput() {
        return this.discountAmountInput.getAttribute('value');
    }

    async setTaxPercentageInput(taxPercentage) {
        await this.taxPercentageInput.sendKeys(taxPercentage);
    }

    async getTaxPercentageInput() {
        return this.taxPercentageInput.getAttribute('value');
    }

    async setTaxAmountInput(taxAmount) {
        await this.taxAmountInput.sendKeys(taxAmount);
    }

    async getTaxAmountInput() {
        return this.taxAmountInput.getAttribute('value');
    }

    async setOrderStatusSelect(orderStatus) {
        await this.orderStatusSelect.sendKeys(orderStatus);
    }

    async getOrderStatusSelect() {
        return this.orderStatusSelect.element(by.css('option:checked')).getText();
    }

    async orderStatusSelectLastOption() {
        await this.orderStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setNoteInput(note) {
        await this.noteInput.sendKeys(note);
    }

    async getNoteInput() {
        return this.noteInput.getAttribute('value');
    }

    async setOrderDateInput(orderDate) {
        await this.orderDateInput.sendKeys(orderDate);
    }

    async getOrderDateInput() {
        return this.orderDateInput.getAttribute('value');
    }

    getIsVariantOrderInput() {
        return this.isVariantOrderInput;
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

    async soldBySelectLastOption() {
        await this.soldBySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async soldBySelectOption(option) {
        await this.soldBySelect.sendKeys(option);
    }

    getSoldBySelect(): ElementFinder {
        return this.soldBySelect;
    }

    async getSoldBySelectedOption() {
        return this.soldBySelect.element(by.css('option:checked')).getText();
    }

    async preparedBySelectLastOption() {
        await this.preparedBySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async preparedBySelectOption(option) {
        await this.preparedBySelect.sendKeys(option);
    }

    getPreparedBySelect(): ElementFinder {
        return this.preparedBySelect;
    }

    async getPreparedBySelectedOption() {
        return this.preparedBySelect.element(by.css('option:checked')).getText();
    }

    async shopDeviceSelectLastOption() {
        await this.shopDeviceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async shopDeviceSelectOption(option) {
        await this.shopDeviceSelect.sendKeys(option);
    }

    getShopDeviceSelect(): ElementFinder {
        return this.shopDeviceSelect;
    }

    async getShopDeviceSelectedOption() {
        return this.shopDeviceSelect.element(by.css('option:checked')).getText();
    }

    async sectionTableSelectLastOption() {
        await this.sectionTableSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async sectionTableSelectOption(option) {
        await this.sectionTableSelect.sendKeys(option);
    }

    getSectionTableSelect(): ElementFinder {
        return this.sectionTableSelect;
    }

    async getSectionTableSelectedOption() {
        return this.sectionTableSelect.element(by.css('option:checked')).getText();
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

export class OrdersDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-orders-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-orders'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
