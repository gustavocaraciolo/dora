import { element, by, ElementFinder } from 'protractor';

export class ProductTypeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product-type div table .btn-danger'));
    title = element.all(by.css('jhi-product-type div h2#page-heading span')).first();

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

export class ProductTypeUpdatePage {
    pageTitle = element(by.id('jhi-product-type-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    productTypeInput = element(by.id('field_productType'));
    productTypeDescriptionInput = element(by.id('field_productTypeDescription'));
    shopSelect = element(by.id('field_shop'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setProductTypeInput(productType) {
        await this.productTypeInput.sendKeys(productType);
    }

    async getProductTypeInput() {
        return this.productTypeInput.getAttribute('value');
    }

    async setProductTypeDescriptionInput(productTypeDescription) {
        await this.productTypeDescriptionInput.sendKeys(productTypeDescription);
    }

    async getProductTypeDescriptionInput() {
        return this.productTypeDescriptionInput.getAttribute('value');
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

export class ProductTypeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-productType-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-productType'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
