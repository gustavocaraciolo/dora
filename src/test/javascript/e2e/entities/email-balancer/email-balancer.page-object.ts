import { element, by, ElementFinder } from 'protractor';

export class EmailBalancerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-email-balancer div table .btn-danger'));
    title = element.all(by.css('jhi-email-balancer div h2#page-heading span')).first();

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

export class EmailBalancerUpdatePage {
    pageTitle = element(by.id('jhi-email-balancer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    relayIdInput = element(by.id('field_relayId'));
    relayPasswordInput = element(by.id('field_relayPassword'));
    startingCountInput = element(by.id('field_startingCount'));
    endingCountInput = element(by.id('field_endingCount'));
    providerInput = element(by.id('field_provider'));
    relayPortInput = element(by.id('field_relayPort'));
    enabledInput = element(by.id('field_enabled'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setRelayIdInput(relayId) {
        await this.relayIdInput.sendKeys(relayId);
    }

    async getRelayIdInput() {
        return this.relayIdInput.getAttribute('value');
    }

    async setRelayPasswordInput(relayPassword) {
        await this.relayPasswordInput.sendKeys(relayPassword);
    }

    async getRelayPasswordInput() {
        return this.relayPasswordInput.getAttribute('value');
    }

    async setStartingCountInput(startingCount) {
        await this.startingCountInput.sendKeys(startingCount);
    }

    async getStartingCountInput() {
        return this.startingCountInput.getAttribute('value');
    }

    async setEndingCountInput(endingCount) {
        await this.endingCountInput.sendKeys(endingCount);
    }

    async getEndingCountInput() {
        return this.endingCountInput.getAttribute('value');
    }

    async setProviderInput(provider) {
        await this.providerInput.sendKeys(provider);
    }

    async getProviderInput() {
        return this.providerInput.getAttribute('value');
    }

    async setRelayPortInput(relayPort) {
        await this.relayPortInput.sendKeys(relayPort);
    }

    async getRelayPortInput() {
        return this.relayPortInput.getAttribute('value');
    }

    getEnabledInput() {
        return this.enabledInput;
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

export class EmailBalancerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-emailBalancer-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-emailBalancer'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
