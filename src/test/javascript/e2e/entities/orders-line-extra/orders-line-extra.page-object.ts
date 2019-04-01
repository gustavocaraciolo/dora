import { element, by, ElementFinder } from 'protractor';

export class OrdersLineExtraComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-orders-line-extra div table .btn-danger'));
    title = element.all(by.css('jhi-orders-line-extra div h2#page-heading span')).first();

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

export class OrdersLineExtraUpdatePage {
    pageTitle = element(by.id('jhi-orders-line-extra-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    ordersLineExtraNameInput = element(by.id('field_ordersLineExtraName'));
    ordersLineExtraValueInput = element(by.id('field_ordersLineExtraValue'));
    ordersLineExtraPriceInput = element(by.id('field_ordersLineExtraPrice'));
    ordersOptionDescriptionInput = element(by.id('field_ordersOptionDescription'));
    fullPhotoInput = element(by.id('file_fullPhoto'));
    fullPhotoUrlInput = element(by.id('field_fullPhotoUrl'));
    thumbnailPhotoInput = element(by.id('file_thumbnailPhoto'));
    thumbnailPhotoUrlInput = element(by.id('field_thumbnailPhotoUrl'));
    ordersLineVariantSelect = element(by.id('field_ordersLineVariant'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setOrdersLineExtraNameInput(ordersLineExtraName) {
        await this.ordersLineExtraNameInput.sendKeys(ordersLineExtraName);
    }

    async getOrdersLineExtraNameInput() {
        return this.ordersLineExtraNameInput.getAttribute('value');
    }

    async setOrdersLineExtraValueInput(ordersLineExtraValue) {
        await this.ordersLineExtraValueInput.sendKeys(ordersLineExtraValue);
    }

    async getOrdersLineExtraValueInput() {
        return this.ordersLineExtraValueInput.getAttribute('value');
    }

    async setOrdersLineExtraPriceInput(ordersLineExtraPrice) {
        await this.ordersLineExtraPriceInput.sendKeys(ordersLineExtraPrice);
    }

    async getOrdersLineExtraPriceInput() {
        return this.ordersLineExtraPriceInput.getAttribute('value');
    }

    async setOrdersOptionDescriptionInput(ordersOptionDescription) {
        await this.ordersOptionDescriptionInput.sendKeys(ordersOptionDescription);
    }

    async getOrdersOptionDescriptionInput() {
        return this.ordersOptionDescriptionInput.getAttribute('value');
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

    async ordersLineVariantSelectLastOption() {
        await this.ordersLineVariantSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async ordersLineVariantSelectOption(option) {
        await this.ordersLineVariantSelect.sendKeys(option);
    }

    getOrdersLineVariantSelect(): ElementFinder {
        return this.ordersLineVariantSelect;
    }

    async getOrdersLineVariantSelectedOption() {
        return this.ordersLineVariantSelect.element(by.css('option:checked')).getText();
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

export class OrdersLineExtraDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-ordersLineExtra-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-ordersLineExtra'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
