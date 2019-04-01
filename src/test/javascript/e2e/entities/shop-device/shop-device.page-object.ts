import { element, by, ElementFinder } from 'protractor';

export class ShopDeviceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-shop-device div table .btn-danger'));
    title = element.all(by.css('jhi-shop-device div h2#page-heading span')).first();

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

export class ShopDeviceUpdatePage {
    pageTitle = element(by.id('jhi-shop-device-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    deviceNameInput = element(by.id('field_deviceName'));
    deviceModelInput = element(by.id('field_deviceModel'));
    registeredDateInput = element(by.id('field_registeredDate'));
    shopSelect = element(by.id('field_shop'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDeviceNameInput(deviceName) {
        await this.deviceNameInput.sendKeys(deviceName);
    }

    async getDeviceNameInput() {
        return this.deviceNameInput.getAttribute('value');
    }

    async setDeviceModelInput(deviceModel) {
        await this.deviceModelInput.sendKeys(deviceModel);
    }

    async getDeviceModelInput() {
        return this.deviceModelInput.getAttribute('value');
    }

    async setRegisteredDateInput(registeredDate) {
        await this.registeredDateInput.sendKeys(registeredDate);
    }

    async getRegisteredDateInput() {
        return this.registeredDateInput.getAttribute('value');
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

export class ShopDeviceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-shopDevice-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-shopDevice'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
