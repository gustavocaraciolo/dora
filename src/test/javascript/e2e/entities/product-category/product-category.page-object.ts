import { element, by, ElementFinder } from 'protractor';

export class ProductCategoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product-category div table .btn-danger'));
    title = element.all(by.css('jhi-product-category div h2#page-heading span')).first();

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

export class ProductCategoryUpdatePage {
    pageTitle = element(by.id('jhi-product-category-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    categoryInput = element(by.id('field_category'));
    descriptionInput = element(by.id('field_description'));
    imageFullInput = element(by.id('file_imageFull'));
    imageFullUrlInput = element(by.id('field_imageFullUrl'));
    imageThumbInput = element(by.id('file_imageThumb'));
    imageThumbUrlInput = element(by.id('field_imageThumbUrl'));
    shopSelect = element(by.id('field_shop'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCategoryInput(category) {
        await this.categoryInput.sendKeys(category);
    }

    async getCategoryInput() {
        return this.categoryInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setImageFullInput(imageFull) {
        await this.imageFullInput.sendKeys(imageFull);
    }

    async getImageFullInput() {
        return this.imageFullInput.getAttribute('value');
    }

    async setImageFullUrlInput(imageFullUrl) {
        await this.imageFullUrlInput.sendKeys(imageFullUrl);
    }

    async getImageFullUrlInput() {
        return this.imageFullUrlInput.getAttribute('value');
    }

    async setImageThumbInput(imageThumb) {
        await this.imageThumbInput.sendKeys(imageThumb);
    }

    async getImageThumbInput() {
        return this.imageThumbInput.getAttribute('value');
    }

    async setImageThumbUrlInput(imageThumbUrl) {
        await this.imageThumbUrlInput.sendKeys(imageThumbUrl);
    }

    async getImageThumbUrlInput() {
        return this.imageThumbUrlInput.getAttribute('value');
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

export class ProductCategoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-productCategory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-productCategory'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
