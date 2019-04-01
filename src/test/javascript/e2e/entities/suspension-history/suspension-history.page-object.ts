import { element, by, ElementFinder } from 'protractor';

export class SuspensionHistoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-suspension-history div table .btn-danger'));
    title = element.all(by.css('jhi-suspension-history div h2#page-heading span')).first();

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

export class SuspensionHistoryUpdatePage {
    pageTitle = element(by.id('jhi-suspension-history-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    suspendedDateInput = element(by.id('field_suspendedDate'));
    suspensionTypeSelect = element(by.id('field_suspensionType'));
    suspendedReasonInput = element(by.id('field_suspendedReason'));
    resolutionNoteInput = element(by.id('field_resolutionNote'));
    unsuspensionDateInput = element(by.id('field_unsuspensionDate'));
    profileSelect = element(by.id('field_profile'));
    suspendedBySelect = element(by.id('field_suspendedBy'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSuspendedDateInput(suspendedDate) {
        await this.suspendedDateInput.sendKeys(suspendedDate);
    }

    async getSuspendedDateInput() {
        return this.suspendedDateInput.getAttribute('value');
    }

    async setSuspensionTypeSelect(suspensionType) {
        await this.suspensionTypeSelect.sendKeys(suspensionType);
    }

    async getSuspensionTypeSelect() {
        return this.suspensionTypeSelect.element(by.css('option:checked')).getText();
    }

    async suspensionTypeSelectLastOption() {
        await this.suspensionTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setSuspendedReasonInput(suspendedReason) {
        await this.suspendedReasonInput.sendKeys(suspendedReason);
    }

    async getSuspendedReasonInput() {
        return this.suspendedReasonInput.getAttribute('value');
    }

    async setResolutionNoteInput(resolutionNote) {
        await this.resolutionNoteInput.sendKeys(resolutionNote);
    }

    async getResolutionNoteInput() {
        return this.resolutionNoteInput.getAttribute('value');
    }

    async setUnsuspensionDateInput(unsuspensionDate) {
        await this.unsuspensionDateInput.sendKeys(unsuspensionDate);
    }

    async getUnsuspensionDateInput() {
        return this.unsuspensionDateInput.getAttribute('value');
    }

    async profileSelectLastOption() {
        await this.profileSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async profileSelectOption(option) {
        await this.profileSelect.sendKeys(option);
    }

    getProfileSelect(): ElementFinder {
        return this.profileSelect;
    }

    async getProfileSelectedOption() {
        return this.profileSelect.element(by.css('option:checked')).getText();
    }

    async suspendedBySelectLastOption() {
        await this.suspendedBySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async suspendedBySelectOption(option) {
        await this.suspendedBySelect.sendKeys(option);
    }

    getSuspendedBySelect(): ElementFinder {
        return this.suspendedBySelect;
    }

    async getSuspendedBySelectedOption() {
        return this.suspendedBySelect.element(by.css('option:checked')).getText();
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

export class SuspensionHistoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-suspensionHistory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-suspensionHistory'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
