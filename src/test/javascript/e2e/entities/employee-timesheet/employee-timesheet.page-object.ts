import { element, by, ElementFinder } from 'protractor';

export class EmployeeTimesheetComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-employee-timesheet div table .btn-danger'));
    title = element.all(by.css('jhi-employee-timesheet div h2#page-heading span')).first();

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

export class EmployeeTimesheetUpdatePage {
    pageTitle = element(by.id('jhi-employee-timesheet-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    checkinTimeInput = element(by.id('field_checkinTime'));
    checkOutTimeInput = element(by.id('field_checkOutTime'));
    regularHoursWorkedInput = element(by.id('field_regularHoursWorked'));
    overTimeHoursWorkedInput = element(by.id('field_overTimeHoursWorked'));
    payInput = element(by.id('field_pay'));
    profileSelect = element(by.id('field_profile'));
    shopSelect = element(by.id('field_shop'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCheckinTimeInput(checkinTime) {
        await this.checkinTimeInput.sendKeys(checkinTime);
    }

    async getCheckinTimeInput() {
        return this.checkinTimeInput.getAttribute('value');
    }

    async setCheckOutTimeInput(checkOutTime) {
        await this.checkOutTimeInput.sendKeys(checkOutTime);
    }

    async getCheckOutTimeInput() {
        return this.checkOutTimeInput.getAttribute('value');
    }

    async setRegularHoursWorkedInput(regularHoursWorked) {
        await this.regularHoursWorkedInput.sendKeys(regularHoursWorked);
    }

    async getRegularHoursWorkedInput() {
        return this.regularHoursWorkedInput.getAttribute('value');
    }

    async setOverTimeHoursWorkedInput(overTimeHoursWorked) {
        await this.overTimeHoursWorkedInput.sendKeys(overTimeHoursWorked);
    }

    async getOverTimeHoursWorkedInput() {
        return this.overTimeHoursWorkedInput.getAttribute('value');
    }

    async setPayInput(pay) {
        await this.payInput.sendKeys(pay);
    }

    async getPayInput() {
        return this.payInput.getAttribute('value');
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

export class EmployeeTimesheetDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-employeeTimesheet-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-employeeTimesheet'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
