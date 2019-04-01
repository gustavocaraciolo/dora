import { element, by, ElementFinder } from 'protractor';

export class OrdersLineVariantComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-orders-line-variant div table .btn-danger'));
    title = element.all(by.css('jhi-orders-line-variant div h2#page-heading span')).first();

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

export class OrdersLineVariantUpdatePage {
    pageTitle = element(by.id('jhi-orders-line-variant-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    variantNameInput = element(by.id('field_variantName'));
    variantValueInput = element(by.id('field_variantValue'));
    descriptionInput = element(by.id('field_description'));
    percentageInput = element(by.id('field_percentage'));
    fullPhotoInput = element(by.id('file_fullPhoto'));
    fullPhotoUrlInput = element(by.id('field_fullPhotoUrl'));
    thumbnailPhotoInput = element(by.id('file_thumbnailPhoto'));
    thumbnailPhotoUrlInput = element(by.id('field_thumbnailPhotoUrl'));
    priceInput = element(by.id('field_price'));
    ordersLineSelect = element(by.id('field_ordersLine'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setVariantNameInput(variantName) {
        await this.variantNameInput.sendKeys(variantName);
    }

    async getVariantNameInput() {
        return this.variantNameInput.getAttribute('value');
    }

    async setVariantValueInput(variantValue) {
        await this.variantValueInput.sendKeys(variantValue);
    }

    async getVariantValueInput() {
        return this.variantValueInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setPercentageInput(percentage) {
        await this.percentageInput.sendKeys(percentage);
    }

    async getPercentageInput() {
        return this.percentageInput.getAttribute('value');
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

    async setThumbnailPhotoInput(thumbnailPhoto) {
        await this.thumbnailPhotoInput.sendKeys(thumbnailPhoto);
    }

    async getThumbnailPhotoInput() {
        return this.thumbnailPhotoInput.getAttribute('value');
    }

    async setThumbnailPhotoUrlInput(thumbnailPhotoUrl) {
        await this.thumbnailPhotoUrlInput.sendKeys(thumbnailPhotoUrl);
    }

    async getThumbnailPhotoUrlInput() {
        return this.thumbnailPhotoUrlInput.getAttribute('value');
    }

    async setPriceInput(price) {
        await this.priceInput.sendKeys(price);
    }

    async getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    async ordersLineSelectLastOption() {
        await this.ordersLineSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async ordersLineSelectOption(option) {
        await this.ordersLineSelect.sendKeys(option);
    }

    getOrdersLineSelect(): ElementFinder {
        return this.ordersLineSelect;
    }

    async getOrdersLineSelectedOption() {
        return this.ordersLineSelect.element(by.css('option:checked')).getText();
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

export class OrdersLineVariantDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-ordersLineVariant-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-ordersLineVariant'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
