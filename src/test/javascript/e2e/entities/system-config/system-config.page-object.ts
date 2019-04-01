import { element, by, ElementFinder } from 'protractor';

export class SystemConfigComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-system-config div table .btn-danger'));
    title = element.all(by.css('jhi-system-config div h2#page-heading span')).first();

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

export class SystemConfigUpdatePage {
    pageTitle = element(by.id('jhi-system-config-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    keyInput = element(by.id('field_key'));
    valueInput = element(by.id('field_value'));
    configurationTypeSelect = element(by.id('field_configurationType'));
    noteInput = element(by.id('field_note'));
    enabledInput = element(by.id('field_enabled'));
    shopSelect = element(by.id('field_shop'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setKeyInput(key) {
        await this.keyInput.sendKeys(key);
    }

    async getKeyInput() {
        return this.keyInput.getAttribute('value');
    }

    async setValueInput(value) {
        await this.valueInput.sendKeys(value);
    }

    async getValueInput() {
        return this.valueInput.getAttribute('value');
    }

    async setConfigurationTypeSelect(configurationType) {
        await this.configurationTypeSelect.sendKeys(configurationType);
    }

    async getConfigurationTypeSelect() {
        return this.configurationTypeSelect.element(by.css('option:checked')).getText();
    }

    async configurationTypeSelectLastOption() {
        await this.configurationTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setNoteInput(note) {
        await this.noteInput.sendKeys(note);
    }

    async getNoteInput() {
        return this.noteInput.getAttribute('value');
    }

    getEnabledInput() {
        return this.enabledInput;
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

export class SystemConfigDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-systemConfig-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-systemConfig'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
