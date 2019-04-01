import { element, by, ElementFinder } from 'protractor';

export class OrdersLineComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-orders-line div table .btn-danger'));
    title = element.all(by.css('jhi-orders-line div h2#page-heading span')).first();

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

export class OrdersLineUpdatePage {
    pageTitle = element(by.id('jhi-orders-line-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    ordersLineNameInput = element(by.id('field_ordersLineName'));
    ordersLineValueInput = element(by.id('field_ordersLineValue'));
    ordersLinePriceInput = element(by.id('field_ordersLinePrice'));
    ordersLineDescriptionInput = element(by.id('field_ordersLineDescription'));
    thumbnailPhotoInput = element(by.id('file_thumbnailPhoto'));
    fullPhotoInput = element(by.id('file_fullPhoto'));
    fullPhotoUrlInput = element(by.id('field_fullPhotoUrl'));
    thumbnailPhotoUrlInput = element(by.id('field_thumbnailPhotoUrl'));
    ordersSelect = element(by.id('field_orders'));
    productSelect = element(by.id('field_product'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setOrdersLineNameInput(ordersLineName) {
        await this.ordersLineNameInput.sendKeys(ordersLineName);
    }

    async getOrdersLineNameInput() {
        return this.ordersLineNameInput.getAttribute('value');
    }

    async setOrdersLineValueInput(ordersLineValue) {
        await this.ordersLineValueInput.sendKeys(ordersLineValue);
    }

    async getOrdersLineValueInput() {
        return this.ordersLineValueInput.getAttribute('value');
    }

    async setOrdersLinePriceInput(ordersLinePrice) {
        await this.ordersLinePriceInput.sendKeys(ordersLinePrice);
    }

    async getOrdersLinePriceInput() {
        return this.ordersLinePriceInput.getAttribute('value');
    }

    async setOrdersLineDescriptionInput(ordersLineDescription) {
        await this.ordersLineDescriptionInput.sendKeys(ordersLineDescription);
    }

    async getOrdersLineDescriptionInput() {
        return this.ordersLineDescriptionInput.getAttribute('value');
    }

    async setThumbnailPhotoInput(thumbnailPhoto) {
        await this.thumbnailPhotoInput.sendKeys(thumbnailPhoto);
    }

    async getThumbnailPhotoInput() {
        return this.thumbnailPhotoInput.getAttribute('value');
    }

    async setFullPhotoInput(fullPhoto) {
        await this.fullPhotoInput.sendKeys(fullPhoto);
    }

    async getFullPhotoInput() {
        return this.fullPhotoInput.getAttribute('value');
    }

    async setFullPhotoUrlInput(fullPhotoUrl) {
        await this.fullPhotoUrlInput.sendKeys(fullPhotoUrl);
    }

    async getFullPhotoUrlInput() {
        return this.fullPhotoUrlInput.getAttribute('value');
    }

    async setThumbnailPhotoUrlInput(thumbnailPhotoUrl) {
        await this.thumbnailPhotoUrlInput.sendKeys(thumbnailPhotoUrl);
    }

    async getThumbnailPhotoUrlInput() {
        return this.thumbnailPhotoUrlInput.getAttribute('value');
    }

    async ordersSelectLastOption() {
        await this.ordersSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async ordersSelectOption(option) {
        await this.ordersSelect.sendKeys(option);
    }

    getOrdersSelect(): ElementFinder {
        return this.ordersSelect;
    }

    async getOrdersSelectedOption() {
        return this.ordersSelect.element(by.css('option:checked')).getText();
    }

    async productSelectLastOption() {
        await this.productSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async productSelectOption(option) {
        await this.productSelect.sendKeys(option);
    }

    getProductSelect(): ElementFinder {
        return this.productSelect;
    }

    async getProductSelectedOption() {
        return this.productSelect.element(by.css('option:checked')).getText();
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

export class OrdersLineDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-ordersLine-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-ordersLine'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
