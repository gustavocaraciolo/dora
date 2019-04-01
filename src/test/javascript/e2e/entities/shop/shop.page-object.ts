import { element, by, ElementFinder } from 'protractor';

export class ShopComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-shop div table .btn-danger'));
    title = element.all(by.css('jhi-shop div h2#page-heading span')).first();

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

export class ShopUpdatePage {
    pageTitle = element(by.id('jhi-shop-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    shopNameInput = element(by.id('field_shopName'));
    shopAccountTypeSelect = element(by.id('field_shopAccountType'));
    approvalDateInput = element(by.id('field_approvalDate'));
    addressInput = element(by.id('field_address'));
    emailInput = element(by.id('field_email'));
    descriptionInput = element(by.id('field_description'));
    noteInput = element(by.id('field_note'));
    landlandInput = element(by.id('field_landland'));
    mobileInput = element(by.id('field_mobile'));
    createdDateInput = element(by.id('field_createdDate'));
    shopLogoInput = element(by.id('file_shopLogo'));
    shopLogoUrlInput = element(by.id('field_shopLogoUrl'));
    activeInput = element(by.id('field_active'));
    currencyInput = element(by.id('field_currency'));
    companySelect = element(by.id('field_company'));
    approvedBySelect = element(by.id('field_approvedBy'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setShopNameInput(shopName) {
        await this.shopNameInput.sendKeys(shopName);
    }

    async getShopNameInput() {
        return this.shopNameInput.getAttribute('value');
    }

    async setShopAccountTypeSelect(shopAccountType) {
        await this.shopAccountTypeSelect.sendKeys(shopAccountType);
    }

    async getShopAccountTypeSelect() {
        return this.shopAccountTypeSelect.element(by.css('option:checked')).getText();
    }

    async shopAccountTypeSelectLastOption() {
        await this.shopAccountTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setApprovalDateInput(approvalDate) {
        await this.approvalDateInput.sendKeys(approvalDate);
    }

    async getApprovalDateInput() {
        return this.approvalDateInput.getAttribute('value');
    }

    async setAddressInput(address) {
        await this.addressInput.sendKeys(address);
    }

    async getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setNoteInput(note) {
        await this.noteInput.sendKeys(note);
    }

    async getNoteInput() {
        return this.noteInput.getAttribute('value');
    }

    async setLandlandInput(landland) {
        await this.landlandInput.sendKeys(landland);
    }

    async getLandlandInput() {
        return this.landlandInput.getAttribute('value');
    }

    async setMobileInput(mobile) {
        await this.mobileInput.sendKeys(mobile);
    }

    async getMobileInput() {
        return this.mobileInput.getAttribute('value');
    }

    async setCreatedDateInput(createdDate) {
        await this.createdDateInput.sendKeys(createdDate);
    }

    async getCreatedDateInput() {
        return this.createdDateInput.getAttribute('value');
    }

    async setShopLogoInput(shopLogo) {
        await this.shopLogoInput.sendKeys(shopLogo);
    }

    async getShopLogoInput() {
        return this.shopLogoInput.getAttribute('value');
    }

    async setShopLogoUrlInput(shopLogoUrl) {
        await this.shopLogoUrlInput.sendKeys(shopLogoUrl);
    }

    async getShopLogoUrlInput() {
        return this.shopLogoUrlInput.getAttribute('value');
    }

    getActiveInput() {
        return this.activeInput;
    }
    async setCurrencyInput(currency) {
        await this.currencyInput.sendKeys(currency);
    }

    async getCurrencyInput() {
        return this.currencyInput.getAttribute('value');
    }

    async companySelectLastOption() {
        await this.companySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async companySelectOption(option) {
        await this.companySelect.sendKeys(option);
    }

    getCompanySelect(): ElementFinder {
        return this.companySelect;
    }

    async getCompanySelectedOption() {
        return this.companySelect.element(by.css('option:checked')).getText();
    }

    async approvedBySelectLastOption() {
        await this.approvedBySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async approvedBySelectOption(option) {
        await this.approvedBySelect.sendKeys(option);
    }

    getApprovedBySelect(): ElementFinder {
        return this.approvedBySelect;
    }

    async getApprovedBySelectedOption() {
        return this.approvedBySelect.element(by.css('option:checked')).getText();
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

export class ShopDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-shop-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-shop'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
