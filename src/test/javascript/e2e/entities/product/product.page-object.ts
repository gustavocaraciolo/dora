import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
    title = element.all(by.css('jhi-product div h2#page-heading span')).first();

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

export class ProductUpdatePage {
    pageTitle = element(by.id('jhi-product-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    productNameInput = element(by.id('field_productName'));
    productDescriptionInput = element(by.id('field_productDescription'));
    priceInput = element(by.id('field_price'));
    quantityInput = element(by.id('field_quantity'));
    productImageFullInput = element(by.id('file_productImageFull'));
    productImageFullUrlInput = element(by.id('field_productImageFullUrl'));
    productImageThumbInput = element(by.id('file_productImageThumb'));
    productImageThumbUrlInput = element(by.id('field_productImageThumbUrl'));
    dateCreatedInput = element(by.id('field_dateCreated'));
    barcodeInput = element(by.id('field_barcode'));
    serialCodeInput = element(by.id('field_serialCode'));
    priorityPositionInput = element(by.id('field_priorityPosition'));
    activeInput = element(by.id('field_active'));
    isVariantProductInput = element(by.id('field_isVariantProduct'));
    productTypesSelect = element(by.id('field_productTypes'));
    shopSelect = element(by.id('field_shop'));
    discountsSelect = element(by.id('field_discounts'));
    taxesSelect = element(by.id('field_taxes'));
    categorySelect = element(by.id('field_category'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setProductNameInput(productName) {
        await this.productNameInput.sendKeys(productName);
    }

    async getProductNameInput() {
        return this.productNameInput.getAttribute('value');
    }

    async setProductDescriptionInput(productDescription) {
        await this.productDescriptionInput.sendKeys(productDescription);
    }

    async getProductDescriptionInput() {
        return this.productDescriptionInput.getAttribute('value');
    }

    async setPriceInput(price) {
        await this.priceInput.sendKeys(price);
    }

    async getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    async setProductImageFullInput(productImageFull) {
        await this.productImageFullInput.sendKeys(productImageFull);
    }

    async getProductImageFullInput() {
        return this.productImageFullInput.getAttribute('value');
    }

    async setProductImageFullUrlInput(productImageFullUrl) {
        await this.productImageFullUrlInput.sendKeys(productImageFullUrl);
    }

    async getProductImageFullUrlInput() {
        return this.productImageFullUrlInput.getAttribute('value');
    }

    async setProductImageThumbInput(productImageThumb) {
        await this.productImageThumbInput.sendKeys(productImageThumb);
    }

    async getProductImageThumbInput() {
        return this.productImageThumbInput.getAttribute('value');
    }

    async setProductImageThumbUrlInput(productImageThumbUrl) {
        await this.productImageThumbUrlInput.sendKeys(productImageThumbUrl);
    }

    async getProductImageThumbUrlInput() {
        return this.productImageThumbUrlInput.getAttribute('value');
    }

    async setDateCreatedInput(dateCreated) {
        await this.dateCreatedInput.sendKeys(dateCreated);
    }

    async getDateCreatedInput() {
        return this.dateCreatedInput.getAttribute('value');
    }

    async setBarcodeInput(barcode) {
        await this.barcodeInput.sendKeys(barcode);
    }

    async getBarcodeInput() {
        return this.barcodeInput.getAttribute('value');
    }

    async setSerialCodeInput(serialCode) {
        await this.serialCodeInput.sendKeys(serialCode);
    }

    async getSerialCodeInput() {
        return this.serialCodeInput.getAttribute('value');
    }

    async setPriorityPositionInput(priorityPosition) {
        await this.priorityPositionInput.sendKeys(priorityPosition);
    }

    async getPriorityPositionInput() {
        return this.priorityPositionInput.getAttribute('value');
    }

    getActiveInput() {
        return this.activeInput;
    }
    getIsVariantProductInput() {
        return this.isVariantProductInput;
    }

    async productTypesSelectLastOption() {
        await this.productTypesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async productTypesSelectOption(option) {
        await this.productTypesSelect.sendKeys(option);
    }

    getProductTypesSelect(): ElementFinder {
        return this.productTypesSelect;
    }

    async getProductTypesSelectedOption() {
        return this.productTypesSelect.element(by.css('option:checked')).getText();
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

    async discountsSelectLastOption() {
        await this.discountsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async discountsSelectOption(option) {
        await this.discountsSelect.sendKeys(option);
    }

    getDiscountsSelect(): ElementFinder {
        return this.discountsSelect;
    }

    async getDiscountsSelectedOption() {
        return this.discountsSelect.element(by.css('option:checked')).getText();
    }

    async taxesSelectLastOption() {
        await this.taxesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async taxesSelectOption(option) {
        await this.taxesSelect.sendKeys(option);
    }

    getTaxesSelect(): ElementFinder {
        return this.taxesSelect;
    }

    async getTaxesSelectedOption() {
        return this.taxesSelect.element(by.css('option:checked')).getText();
    }

    async categorySelectLastOption() {
        await this.categorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async categorySelectOption(option) {
        await this.categorySelect.sendKeys(option);
    }

    getCategorySelect(): ElementFinder {
        return this.categorySelect;
    }

    async getCategorySelectedOption() {
        return this.categorySelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-product-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-product'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
