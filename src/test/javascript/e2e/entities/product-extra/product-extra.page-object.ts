import { element, by, ElementFinder } from 'protractor';

export class ProductExtraComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product-extra div table .btn-danger'));
    title = element.all(by.css('jhi-product-extra div h2#page-heading span')).first();

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

export class ProductExtraUpdatePage {
    pageTitle = element(by.id('jhi-product-extra-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    extraNameInput = element(by.id('field_extraName'));
    descriptionInput = element(by.id('field_description'));
    extraValueInput = element(by.id('field_extraValue'));
    fullPhotoInput = element(by.id('file_fullPhoto'));
    fullPhotoUrlInput = element(by.id('field_fullPhotoUrl'));
    thumbnailPhotoInput = element(by.id('file_thumbnailPhoto'));
    thumbnailPhotoUrlInput = element(by.id('field_thumbnailPhotoUrl'));
    productSelect = element(by.id('field_product'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setExtraNameInput(extraName) {
        await this.extraNameInput.sendKeys(extraName);
    }

    async getExtraNameInput() {
        return this.extraNameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setExtraValueInput(extraValue) {
        await this.extraValueInput.sendKeys(extraValue);
    }

    async getExtraValueInput() {
        return this.extraValueInput.getAttribute('value');
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

export class ProductExtraDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-productExtra-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-productExtra'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
