import { element, by, ElementFinder } from 'protractor';

export class SystemEventsHistoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-system-events-history div table .btn-danger'));
    title = element.all(by.css('jhi-system-events-history div h2#page-heading span')).first();

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

export class SystemEventsHistoryUpdatePage {
    pageTitle = element(by.id('jhi-system-events-history-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    eventNameInput = element(by.id('field_eventName'));
    eventDateInput = element(by.id('field_eventDate'));
    eventApiInput = element(by.id('field_eventApi'));
    eventNoteInput = element(by.id('field_eventNote'));
    eventEntityNameInput = element(by.id('field_eventEntityName'));
    eventEntityIdInput = element(by.id('field_eventEntityId'));
    triggedBySelect = element(by.id('field_triggedBy'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setEventNameInput(eventName) {
        await this.eventNameInput.sendKeys(eventName);
    }

    async getEventNameInput() {
        return this.eventNameInput.getAttribute('value');
    }

    async setEventDateInput(eventDate) {
        await this.eventDateInput.sendKeys(eventDate);
    }

    async getEventDateInput() {
        return this.eventDateInput.getAttribute('value');
    }

    async setEventApiInput(eventApi) {
        await this.eventApiInput.sendKeys(eventApi);
    }

    async getEventApiInput() {
        return this.eventApiInput.getAttribute('value');
    }

    async setEventNoteInput(eventNote) {
        await this.eventNoteInput.sendKeys(eventNote);
    }

    async getEventNoteInput() {
        return this.eventNoteInput.getAttribute('value');
    }

    async setEventEntityNameInput(eventEntityName) {
        await this.eventEntityNameInput.sendKeys(eventEntityName);
    }

    async getEventEntityNameInput() {
        return this.eventEntityNameInput.getAttribute('value');
    }

    async setEventEntityIdInput(eventEntityId) {
        await this.eventEntityIdInput.sendKeys(eventEntityId);
    }

    async getEventEntityIdInput() {
        return this.eventEntityIdInput.getAttribute('value');
    }

    async triggedBySelectLastOption() {
        await this.triggedBySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async triggedBySelectOption(option) {
        await this.triggedBySelect.sendKeys(option);
    }

    getTriggedBySelect(): ElementFinder {
        return this.triggedBySelect;
    }

    async getTriggedBySelectedOption() {
        return this.triggedBySelect.element(by.css('option:checked')).getText();
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

export class SystemEventsHistoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-systemEventsHistory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-systemEventsHistory'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
