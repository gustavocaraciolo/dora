import { element, by, ElementFinder } from 'protractor';

export class ShopChangeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-shop-change div table .btn-danger'));
    title = element.all(by.css('jhi-shop-change div h2#page-heading span')).first();

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

export class ShopChangeUpdatePage {
    pageTitle = element(by.id('jhi-shop-change-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    changeInput = element(by.id('field_change'));
    changedEntityInput = element(by.id('field_changedEntity'));
    noteInput = element(by.id('field_note'));
    changeDateInput = element(by.id('field_changeDate'));
    shopSelect = element(by.id('field_shop'));
    changedBySelect = element(by.id('field_changedBy'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setChangeInput(change) {
        await this.changeInput.sendKeys(change);
    }

    async getChangeInput() {
        return this.changeInput.getAttribute('value');
    }

    async setChangedEntityInput(changedEntity) {
        await this.changedEntityInput.sendKeys(changedEntity);
    }

    async getChangedEntityInput() {
        return this.changedEntityInput.getAttribute('value');
    }

    async setNoteInput(note) {
        await this.noteInput.sendKeys(note);
    }

    async getNoteInput() {
        return this.noteInput.getAttribute('value');
    }

    async setChangeDateInput(changeDate) {
        await this.changeDateInput.sendKeys(changeDate);
    }

    async getChangeDateInput() {
        return this.changeDateInput.getAttribute('value');
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

    async changedBySelectLastOption() {
        await this.changedBySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async changedBySelectOption(option) {
        await this.changedBySelect.sendKeys(option);
    }

    getChangedBySelect(): ElementFinder {
        return this.changedBySelect;
    }

    async getChangedBySelectedOption() {
        return this.changedBySelect.element(by.css('option:checked')).getText();
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

export class ShopChangeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-shopChange-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-shopChange'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
