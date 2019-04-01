import { element, by, ElementFinder } from 'protractor';

export class ShopSectionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-shop-section div table .btn-danger'));
    title = element.all(by.css('jhi-shop-section div h2#page-heading span')).first();

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

export class ShopSectionUpdatePage {
    pageTitle = element(by.id('jhi-shop-section-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    sectionNameInput = element(by.id('field_sectionName'));
    descriptionInput = element(by.id('field_description'));
    surchargePercentageInput = element(by.id('field_surchargePercentage'));
    surchargeFlatAmountInput = element(by.id('field_surchargeFlatAmount'));
    usePercentageInput = element(by.id('field_usePercentage'));
    shopSelect = element(by.id('field_shop'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSectionNameInput(sectionName) {
        await this.sectionNameInput.sendKeys(sectionName);
    }

    async getSectionNameInput() {
        return this.sectionNameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setSurchargePercentageInput(surchargePercentage) {
        await this.surchargePercentageInput.sendKeys(surchargePercentage);
    }

    async getSurchargePercentageInput() {
        return this.surchargePercentageInput.getAttribute('value');
    }

    async setSurchargeFlatAmountInput(surchargeFlatAmount) {
        await this.surchargeFlatAmountInput.sendKeys(surchargeFlatAmount);
    }

    async getSurchargeFlatAmountInput() {
        return this.surchargeFlatAmountInput.getAttribute('value');
    }

    getUsePercentageInput() {
        return this.usePercentageInput;
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

export class ShopSectionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-shopSection-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-shopSection'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
